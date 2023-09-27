import React from 'react';
import './Invoice.css'; // Create a CSS file and name it Invoice.css to apply the styles
import { Box } from '@mui/material';

const Invoice = () => {
  return (
    <Box pb="20px" sx={{backgroundColor:'#ebedef', minHeight:'100vh', }}>
        <div className="invoice-container text-dark">
      <div className="invoice-header">
        <h1 className="text-center">Payment Invoice</h1>
      </div>
      <div className="invoice-details">
        <table className="bordered-table">
          <tr>
            <th><h4>Invoice Number:</h4></th>
            <td><h4>INV-2023-123</h4></td>
          </tr>
          <tr>
            <th><h4>Issue Date:</h4></th>
            <td><h4>2023-07-28</h4></td>
          </tr>
          <tr>
            <th><h4>Due Date:</h4></th>
            <td><h4>2023-08-10</h4></td>
          </tr>
          <tr>
            <th><h4>Bill To:</h4></th>
            <td><h4>Customer Name : Pradip Kathar</h4></td>
          </tr>
        </table>
      </div>
      <div className="invoice-items">
        <table className="bordered-table">
          <tr>
            <th><h4>Item</h4></th>
            <th><h4>Description</h4></th>
            <th><h4>Unit Price</h4></th>
            <th><h4>Quantity</h4></th>
            <th><h4>Total</h4></th>
          </tr>
          <tr>
            <td><h4>Item 1</h4></td>
            <td><h4>Description of Item 1</h4></td>
            <td><h4> &#8377; 50.00</h4></td>
            <td><h4>2</h4></td>
            <td><h4> &#8377; 100.00</h4></td>
          </tr>
          <tr>
            <td><h4>Item 2</h4></td>
            <td><h4>Description of Item 2</h4></td>
            <td><h4> &#8377; 30.00</h4></td>
            <td><h4>1</h4></td>
            <td><h4> &#8377; 30.00</h4></td>
          </tr>
        </table>
      </div>
      <div className="invoice-total d-flex justify-content-between">
        <Box>
        <p>
          <strong><h4>Total Amount:</h4></strong> <h4> &#8377; 130.00</h4>
        </p>
        </Box>
        <Box mt="20px" justifyContent="end"><button className='btn btn-outline-primary'>Download</button></Box>
      </div>
    </div>
    </Box>
  );
};

export default Invoice;