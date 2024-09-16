import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PaymentTrackerContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const FilterLabel = styled.label`
  margin-right: 10px;
  font-weight: bold;
  color: #555;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background-color: #f1f3f5;
  color: #333;
  font-weight: bold;
  text-align: left;
  padding: 12px;
  border-bottom: 2px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  color: #333;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }

  &:hover {
    background-color: #e9ecef;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  
  ${({ status }) => {
    switch (status) {
      case 'success':
        return 'background-color: #d4edda; color: #155724;';
      case 'pending':
        return 'background-color: #fff3cd; color: #856404;';
      case 'failed':
        return 'background-color: #f8d7da; color: #721c24;';
      default:
        return 'background-color: #e9ecef; color: #495057;';
    }
  }}
`;
const NoResultsMessage = styled.p`
  text-align: center;
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 12px;
  margin-top: 20px;
`;

function PaymentTracker() {
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, [filter]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://gst-system-backend-admin.onrender.com/api/payments?filter=${filter}`);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <PaymentTrackerContainer>
      <Title>Payment Tracker</Title>
      <FilterContainer>
        <FilterLabel htmlFor="filter">Filter by status:</FilterLabel>
        <FilterSelect id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </FilterSelect>
      </FilterContainer>
      {loading ? (
        <p>Loading...</p>
      ) : payments.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <Th>Invoice ID</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <Tr key={payment._id}>
                <Td>{payment._id}</Td>
                <Td>₹{payment.amount.toFixed(2)}</Td>
                <Td>
                  <StatusBadge status={payment.status}>
                    {payment.status}
                  </StatusBadge>
                </Td>
                <Td>{new Date(payment.transactionDate).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <NoResultsMessage>
          No payments found for the selected filter. Please try a different filter.
        </NoResultsMessage>
      )}
    </PaymentTrackerContainer>
  );
}

export default PaymentTracker;

