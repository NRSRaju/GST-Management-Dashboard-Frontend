

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import '../styles/main.css'

// // function Dashboard() {
// //   const [dashboardData, setDashboardData] = useState(null);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchDashboardData = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:5000/api/dashboard');
// //         setDashboardData(response.data);
// //       } catch (error) {
// //         console.error('Error fetching dashboard data:', error);
// //         setError('Failed to load dashboard data. Please try again later.');
// //       }
// //     };

// //     fetchDashboardData();
// //   }, []);

// //   if (error) return <div className="error">{error}</div>;
// //   if (!dashboardData) return <div className="loading">Loading...</div>;

// //   return (
// //     <div className="dashboard">
// //       <h2>GST Dashboard</h2>
// //       <div className="dashboard-grid">
// //         <div className="dashboard-card">
// //           <h3>Total GST Collected</h3>
// //           <p>₹{dashboardData.totalGSTCollected.toFixed(2)}</p>
// //         </div>
// //         <div className="dashboard-card">
// //           <h3>Pending Payments</h3>
// //           <p>{dashboardData.pendingPayments}</p>
// //         </div>
// //         <div className="dashboard-card">
// //           <h3>Total Invoices</h3>
// //           <p>{dashboardData.totalInvoices}</p>
// //         </div>
// //         <div className="dashboard-card">
// //           <h3>Monthly GST Average</h3>
// //           <p>₹{dashboardData.monthlyGSTAverage.toFixed(2)}</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Dashboard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../styles/main.css';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import { DashboardContainer, Heading, Button, AlertContainer, InvoiceTable, FilterContainer, Select, Input, Form, Label, AppContainer } from '../styles/StyledComponents';

// function Dashboard() {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [error, setError] = useState(null);
//   const [invoices, setInvoices] = useState([]);
//   const [totalGSTDue, setTotalGSTDue] = useState(0);
//   const [filter, setFilter] = useState({ status: '', recruiterId: '' });
//   const [reminderDays, setReminderDays] = useState(7);

//   useEffect(() => {
//     fetchDashboardData();
//     fetchInvoices();
//   }, [filter]);

//   const fetchDashboardData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/dashboard');
//       setDashboardData(response.data);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       setError('Failed to load dashboard data. Please try again later.');
//     }
//   };

//   const fetchInvoices = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/invoices', {
//         params: filter,
//       });
//       setInvoices(response.data);
//       calculateTotalGSTDue(response.data);
//     } catch (error) {
//       console.error('Error fetching invoices:', error);
//     }
//   };

//   const calculateTotalGSTDue = (invoices) => {
//     const total = invoices.reduce((sum, invoice) => {
//       return invoice.status === 'pending' ? sum + invoice.gstAmount : sum;
//     }, 0);
//     setTotalGSTDue(total);
//   };

//   const handleFilterChange = (newFilter) => {
//     setFilter({ ...filter, ...newFilter });
//   };

//   const handleReminderSettingsSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/settings', { reminderDays });
//       alert('Reminder settings updated successfully');
//     } catch (error) {
//       console.error('Error updating reminder settings:', error);
//       alert('Failed to update reminder settings');
//     }
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Invoice List', 20, 10);

//     const tableColumn = ['Recruiter', 'Amount', 'GST Amount', 'Due Date', 'Status'];
//     const tableRows = invoices.map((invoice) => [
//       invoice.recruiter.name,
//       `$${invoice.amount.toFixed(2)}`,
//       `$${invoice.gstAmount.toFixed(2)}`,
//       new Date(invoice.dueDate).toLocaleDateString(),
//       invoice.status
//     ]);

//     doc.autoTable(tableColumn, tableRows, { startY: 20 });
//     doc.save('invoice_list.pdf');
//   };

//   if (error) return <div className="error">{error}</div>;
//   if (!dashboardData) return <div className="loading">Loading...</div>;

//   return (
//     <DashboardContainer>
//       {/* <Heading>GST Reminder Dashboard</Heading> */}
//       <div className="dashboard-grid">
//         <div className="dashboard-card">
//           <h3>Total GST Collected</h3>
//           <p>₹{dashboardData.totalGSTCollected.toFixed(2)}</p>
//         </div>
//         <div className="dashboard-card">
//           <h3>Pending Payments</h3>
//           <p>{dashboardData.pendingPayments}</p>
//         </div>
//         <div className="dashboard-card">
//           <h3>Total Invoices</h3>
//           <p>{dashboardData.totalInvoices}</p>
//         </div>
//         <div className="dashboard-card">
//           <h3>Monthly GST Average</h3>
//           <p>₹{dashboardData.monthlyGSTAverage.toFixed(2)}</p>
//         </div>
//       </div>

//       <div className="invoice-list">
//         <h2>{" "}</h2>
//         <FilterContainer>
//           <Select
//             value={filter.status}
//             onChange={(e) => handleFilterChange({ status: e.target.value })}
//           >
//             <option value="">All Statuses</option>
//             <option value="pending">Pending</option>
//             <option value="paid">Paid</option>
//           </Select>
//           <Input
//             type="text"
//             placeholder="Recruiter Name"
//             value={filter.recruiterId}
//             onChange={(e) => handleFilterChange({ recruiterId: e.target.value })}
//           />
//           <Button onClick={exportToPDF}>Export to PDF</Button>
//         </FilterContainer>
//         <InvoiceTable>
//           <thead>
//             <tr>
//               <th>Recruiter</th>
//               <th>Amount</th>
//               <th>GST Amount</th>
//               <th>Due Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
       
//           <tbody>
//           {invoices.map((invoice) => (
//             <tr key={invoice._id}>
//               <td>{invoice.recruiter && invoice.recruiter.name ? invoice.recruiter.name : 'No Recruiter'}</td>
//               <td>${invoice.amount}</td>
//               <td>${invoice.gstAmount}</td>
//               <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
//               <td>{invoice.status}</td>
//             </tr>
//           ))}
//           </tbody>
//         </InvoiceTable>
//       </div>

//       <div className="reminder-settings">
//         <h2>Reminder Settings</h2>
//         <Form onSubmit={handleReminderSettingsSubmit}>
//           <Label>
//             Send reminders
//             <Input
//               type="number"
//               value={reminderDays}
//               onChange={(e) => setReminderDays(e.target.value)}
//               min="1"
//               max="30"
//             />
//             days before due date
//           </Label>
//           <Button type="submit">Save Settings</Button>
//         </Form>
//       </div>

//       <AlertContainer>
//         <h2>Admin Alert</h2>
//         <p>Total GST Amount Due: ${totalGSTDue.toFixed(2)}</p>
//         <Button onClick={() => alert('Alert sent to admin')}>Send Alert to Admin</Button>
//       </AlertContainer>
//     </DashboardContainer>
//   );
// }

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/main.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DashboardContainer, Heading, Button, AlertContainer, InvoiceTable, FilterContainer, Select, Input, Form, Label, AppContainer } from '../styles/StyledComponents';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [totalGSTDue, setTotalGSTDue] = useState(0);
  const [filter, setFilter] = useState({ status: '', recruiterName: '' });
  const [reminderDays, setReminderDays] = useState(7);

  useEffect(() => {
    fetchDashboardData();
    fetchInvoices();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [invoices, filter]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('https://gst-management-dashboard.onrender.com/api/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data. Please try again later.');
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('https://gst-management-dashboard.onrender.com/api/invoices');
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

  const handleReminderSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://gst-management-dashboard.onrender.com/api/settings', { reminderDays });
      toast.success('Reminder settings updated successfully');
    } catch (error) {
      console.error('Error updating reminder settings:', error);
      toast.error('Failed to update reminder settings. Please try again.');
    }
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

      <div className="invoice-list">
        <h2>{" "}</h2>
        <FilterContainer>
          <Select
            value={filter.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </Select>
          <Input
            type="text"
            placeholder="Recruiter Name"
            value={filter.recruiterName}
            onChange={(e) => handleFilterChange('recruiterName', e.target.value)}
          />
          <Button onClick={exportToPDF}>Export to PDF</Button>
        </FilterContainer>
        <InvoiceTable>
          <thead>
            <tr>
              <th>Recruiter</th>
              <th>Amount</th>
              <th>GST Amount</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
       
          <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.recruiter && invoice.recruiter.name ? invoice.recruiter.name : 'No Recruiter'}</td>
              <td>₹{invoice.amount.toFixed(2)}</td>
              <td>₹{invoice.gstAmount.toFixed(2)}</td>
              <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
              <td>{invoice.status}</td>
            </tr>
          ))}
          </tbody>
        </InvoiceTable>
      </div>

      <div className="reminder-settings">
        <h2>Reminder Settings</h2>
        <Form onSubmit={handleReminderSettingsSubmit}>
          <Label>
            Send reminders
            <Input
              type="number"
              value={reminderDays}
              onChange={(e) => setReminderDays(e.target.value)}
              min="1"
              max="30"
            />
            days before due date
          </Label>
          <Button type="submit">Save Settings</Button>
        </Form>
      </div>

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