
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InvoiceForm = () => {
  const [recruiterName, setRecruiterName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://gst-system-backend-admin.onrender.com/api/invoices', {
        recruiterName,
        amount,
        dueDate, // Include dueDate in the request payload
      });

      toast.success('Invoice created successfully');
      // Clear form fields after successful creation
      setRecruiterName('');
      setAmount('');
      setDueDate('');
    } catch (error) {
      console.error('Error creating invoice:', error.response?.data || error.message);
      toast.error(`Error creating invoice: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="invoice-form">
      <h2>Create New Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recruiterName">Recruiter Name:</label>
          <input
            type="text"
            id="recruiterName"
            name="recruiterName"
            value={recruiterName}
            onChange={(e) => setRecruiterName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Invoice</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default InvoiceForm;
