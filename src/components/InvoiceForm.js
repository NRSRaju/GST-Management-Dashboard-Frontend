
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "../styles/main.css"
import 'react-toastify/dist/ReactToastify.css';

function InvoiceForm() {
  const [invoiceData, setInvoiceData] = useState({
    recruiterID: '',
    amount: '',
    description: ''
  });

  const handleChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://gst-management-dashboard.onrender.com/api/invoices', invoiceData);
      toast.success('Invoice created successfully');
      setInvoiceData({ recruiterID: '', amount: '', description: '' });
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast.error('Error creating invoice');
    }
  };

  return (
    <div className="invoice-form">
      <h2>Create New Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recruiterID">Recruiter ID:</label>
          <input
            type="text"
            id="recruiterID"
            name="recruiterID"
            value={invoiceData.recruiterID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={invoiceData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={invoiceData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Invoice</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default InvoiceForm;
