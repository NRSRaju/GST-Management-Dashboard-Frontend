
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 12px;
  &:focus-within {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  font-size: 16px;
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`;

const StyledButton = styled.button`
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #218838;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #343a40;
  margin-bottom: 30px;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const IconWrapper = styled.span`
  color: #6c757d;
`;

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://gst-system-backend-admin.onrender.com/api/login', formData);
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <FormContainer>
      <Title>Welcome Back</Title>
      <StyledForm onSubmit={handleSubmit}>
        <InputWrapper>
          <IconWrapper><FaEnvelope /></IconWrapper>
          <StyledInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <IconWrapper><FaLock /></IconWrapper>
          <StyledInput
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </InputWrapper>
        <StyledButton type="submit">
          <FaSignInAlt style={{ marginRight: '10px' }} />
          Sign In
        </StyledButton>
      </StyledForm>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Don't have an account? <StyledLink to="/register">Create one</StyledLink>
      </p>
    </FormContainer>
  );
}

export default Login;