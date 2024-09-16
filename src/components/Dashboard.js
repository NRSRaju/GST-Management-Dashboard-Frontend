
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/main.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DashboardContainer, AlertContainer, InvoiceTable,Button, Form, Label, AppContainer } from '../styles/StyledComponents';
import { FaFileExport, FaSearch, FaFilter } from 'react-icons/fa';
import { MdPayment, MdPendingActions } from 'react-icons/md';
import { BiSortAlt2 } from 'react-icons/bi';


 const InvoiceListContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  padding: 30px;
  margin-top: 40px;
`;



 const InvoiceListHeader = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
`;

 const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
`;

 const IconWrapper = styled.span`
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
`;

 const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;

  ${IconWrapper} {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

 const Select = styled.select`
  appearance: none;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 6px;
  padding: 12px 35px 12px 40px;
  font-size: 14px;
  color: #495057;
  cursor: pointer;
  transition: all 0.3s ease;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23495057'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 18px;

  &:hover, &:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

 const InputWrapper = styled.div`
  position: relative;
  display: inline-block;

  ${IconWrapper} {
    position: absolute;
    top: 50%;
    right:0%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

 const Input = styled.input`
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 6px;
  padding: 12px 15px 12px 40px;
  font-size: 14px;
  color: #495057;
  transition: all 0.3s ease;
  padding-left:20px;
  &:hover, &:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: #adb5bd;
   
  }
`;

 const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  
  ${props => props.status === 'pending' && `
    background-color: #fff3cd;
    color: #856404;
  `}
  
  ${props => props.status === 'paid' && `
    background-color: #d4edda;
    color: #155724;
  `}

  ${IconWrapper} {
    margin-right: 4px;
  }
`;

const ActionSelect = styled(Select)`
padding: 8px 30px 8px 12px;
font-size: 12px;
`;

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [totalGSTDue, setTotalGSTDue] = useState(0);
  const [filter, setFilter] = useState({ status: '', recruiterName: '' });

  useEffect(() => {
    fetchDashboardData();
    fetchInvoices();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [invoices, filter]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('https://gst-system-backend-admin.onrender.com/api/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data. Please try again later.');
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('https://gst-system-backend-admin.onrender.com/api/invoices');
      setInvoices(response.data);
      calculateTotalGSTDue(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast.error('Failed to fetch invoices. Please try again later.');
    }
  };

  const calculateTotalGSTDue = (invoices) => {
    const total = invoices.reduce((sum, invoice) => {
      return invoice.status === 'pending' ? sum + invoice.gstAmount : sum;
    }, 0);
    setTotalGSTDue(total);
  };

  const applyFilters = () => {
    let filtered = invoices;

    if (filter.status) {
      filtered = filtered.filter(invoice => invoice.status === filter.status);
    }

    if (filter.recruiterName) {
      filtered = filtered.filter(invoice => 
        invoice.recruiter && 
        invoice.recruiter.name && 
        invoice.recruiter.name.toLowerCase().includes(filter.recruiterName.toLowerCase())
      );
    }

    setFilteredInvoices(filtered);
    calculateTotalGSTDue(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilter(prevFilter => ({ ...prevFilter, [key]: value }));
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Invoice List', 20, 10);

    const tableColumn = ['Recruiter', 'Amount', 'GST Amount', 'Due Date', 'Status'];
    const tableRows = filteredInvoices.map((invoice) => [
      invoice.recruiter && invoice.recruiter.name ? invoice.recruiter.name : 'No Recruiter',
      `₹${invoice.amount.toFixed(2)}`,
      `₹${invoice.gstAmount.toFixed(2)}`,
      new Date(invoice.dueDate).toLocaleDateString(),
      invoice.status
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('invoice_list.pdf');
  };

  if (error) return <div className="error">{error}</div>;
  if (!dashboardData) return <div className="loading">Loading...</div>;

  const updateInvoiceStatus = async (invoiceId, newStatus) => {
    console.log('Updating invoice:', invoiceId, newStatus);
    try {
      const response = await axios.put(`https://gst-system-backend-admin.onrender.com/api/invoices/${invoiceId}`, { status: newStatus });
      console.log('Update response:', response.data);
      fetchInvoices();
      toast.success('Invoice status updated successfully');
    } catch (error) {
      console.error('Error updating invoice status:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.log('Invoice ID:', invoiceId);
      console.log('New Status:', newStatus);
      toast.error('Failed to update invoice status. Please try again.');
    }
  };
  return (
    <DashboardContainer>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total GST Collected</h3>
          <p>₹{dashboardData.totalGSTCollected.toFixed(2)}</p>
        </div>
        <div className="dashboard-card">
          <h3>Pending Payments</h3>
          <p>{dashboardData.pendingPayments}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Invoices</h3>
          <p>{dashboardData.totalInvoices}</p>
        </div>
        <div className="dashboard-card">
          <h3>Monthly GST Average</h3>
          <p>₹{dashboardData.monthlyGSTAverage.toFixed(2)}</p>
        </div>
      </div>

      <InvoiceListContainer>
      <InvoiceListHeader>
        <IconWrapper><BiSortAlt2 /></IconWrapper>
        Invoice List
      </InvoiceListHeader>
      <FilterContainer>
        <SelectWrapper>
          <IconWrapper><FaFilter /></IconWrapper>
          <Select
            value={filter.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </Select>
        </SelectWrapper>
        <InputWrapper>
          
          <Input
            type="text"
            placeholder="Recruiter Name"
            value={filter.recruiterName}
            onChange={(e) => handleFilterChange('recruiterName', e.target.value)}
          />
            <IconWrapper><FaSearch /></IconWrapper>
        </InputWrapper>
        <Button onClick={exportToPDF}>
          <IconWrapper><FaFileExport /></IconWrapper>
          Export to PDF
        </Button>
      </FilterContainer>
      <InvoiceTable>
        <thead>
      <tr>
        <th>Recruiter</th>
        <th>Amount</th>
        <th>GST Amount</th>
        <th>Due Date</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {filteredInvoices.map((invoice) => (
        <tr key={invoice._id}>
          <td>{invoice.recruiter && invoice.recruiter.name ? invoice.recruiter.name : 'No Recruiter'}</td>
          <td>₹{invoice.amount.toFixed(2)}</td>
          <td>₹{invoice.gstAmount.toFixed(2)}</td>
          <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
          <td>
            <StatusBadge status={invoice.status}>
              <IconWrapper>
                {invoice.status === 'pending' ? <MdPendingActions /> : <MdPayment />}
              </IconWrapper>
              {invoice.status}
            </StatusBadge>
          </td>
          <td>
            <ActionSelect
              value={invoice.status}
              onChange={(e) => updateInvoiceStatus(invoice._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </ActionSelect>
          </td>
        </tr>
      ))}
    </tbody>
  </InvoiceTable>
</InvoiceListContainer>

      <AlertContainer>
        <h2>Admin Alert</h2>
        <p>Total GST Amount Due: ₹{totalGSTDue.toFixed(2)}</p>
        <Button onClick={() => toast.info('Alert sent to admin')}>Send Alert to Admin</Button>
      </AlertContainer>
      <ToastContainer />
    </DashboardContainer>
  );
}

export default Dashboard;