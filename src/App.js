
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import InvoiceForm from './components/InvoiceForm';
import PaymentTracker from './components/PaymentTracker';
import GSTReport from './components/GSTReport';
import './styles/main.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}>
          <Link to="/">Dashboard</Link>
        </li>
        <li className={`navbar-item ${location.pathname === '/invoice' ? 'active' : ''}`}>
          <Link to="/invoice">Create Invoice</Link>
        </li>
        <li className={`navbar-item ${location.pathname === '/payments' ? 'active' : ''}`}>
          <Link to="/payments">Payment Tracker</Link>
        </li>
        <li className={`navbar-item ${location.pathname === '/report' ? 'active' : ''}`}>
          <Link to="/report">GST Report</Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>GST Management System</h1>
        </header>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoice" element={<InvoiceForm />} />
          <Route path="/payments" element={<PaymentTracker />} />
          <Route path="/report" element={<GSTReport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
