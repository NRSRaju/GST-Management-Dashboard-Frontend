
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/main.css'

function PaymentTracker() {
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPayments();
  }, [filter]);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`https://gst-management-dashboard.onrender.com/api/payments?filter=${filter}`);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="payment-tracker">
      <h2>Payment Tracker</h2>
      <div>
        <label htmlFor="filter">Filter by status:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment._id}</td>
              <td>₹{payment.amount.toFixed(2)}</td>
              <td>{payment.status}</td>
              <td>{new Date(payment.transactionDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentTracker;
