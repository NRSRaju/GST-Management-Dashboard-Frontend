import styled from 'styled-components';

// Dashboard and Main Layout
export const DashboardContainer = styled.div`
  padding: 40px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-top:15px;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

export const Heading = styled.h1`
  text-align: center;
  color: #333333;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

// InvoiceList Styles
export const InvoiceTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 30px;

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
    font-size: 1rem;
  }

  th {
    background-color: #007acc;
    color: #ffffff;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #f4f6f8;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 10px;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    th, td {
      padding: 8px;
      font-size: 0.8rem;
    }
  }
`;

// export const FilterContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 30px;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 15px;
//   }
// `;

// export const Select = styled.select`
//   padding: 12px 18px;
//   border-radius: 6px;
//   border: 1px solid #cccccc;
//   background-color: #ffffff;
//   font-size: 1rem;
  
//   &:focus {
//     border-color: #007acc;
//     outline: none;
//   }

//   @media (max-width: 480px) {
//     padding: 10px 15px;
//   }
// `;

// export const Input = styled.input`
//   padding: 12px 18px;
//   border-radius: 6px;
//   border: 1px solid #cccccc;
//   background-color: #ffffff;
//   font-size: 1rem;

//   &:focus {
//     border-color: #007acc;
//     outline: none;
//   }

//   @media (max-width: 480px) {
//     padding: 10px 15px;
//   }
// `;

// ReminderSettings Styles
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
  max-width: 600px;
  width: 100%;
  margin: 30px auto;
`;

export const Label = styled.label`
  font-size: 1.2rem;
  color: #333333;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// export const Button = styled.button`
//   padding: 15px 25px;
//   border: none;
//   background-color: #007acc;
//   color: white;
//   border-radius: 6px;
//   cursor: pointer;
//   font-size: 1rem;
//   font-weight: 600;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #005c99;
//   }

//   @media (max-width: 480px) {
//     padding: 12px 20px;
//   }
// `;

// AdminAlert Styles
export const AlertContainer = styled.div`
  margin-top: 40px;
  padding: 20px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 18px;
  }

  @media (max-width: 480px) {
    padding: 15px;
    font-size: 0.9rem;
  }
`;

// Global Styles
export const GlobalStyle = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica Neue', sans-serif;
    background-color: #f9fafb;
    color: #333333;
    font-size: 1rem;
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    color: #333333;
  }

  a {
    color: #007acc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: inherit;
  }
`;

export const AppContainer = styled.div`
  text-align: center;
  max-width: 1200px;
  justify-content: center;
  margin: auto;
`;


export const FilterContainer = styled.div`
  display: flex;
  flex-direction:row;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  background-color: #ffffff;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  width: 150px;

  &:focus {
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 16px;
  width: 100px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  width: 200px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

