import React from 'react';
import { Link } from 'react-router-dom';

const navBarStyle = {
  backgroundColor: '#333',
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px',
};

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontWeight: 'bold',
};

const NavBar = () => {
  return (
    <div style={navBarStyle}>
      <Link to="/" style={linkStyle}>Homepage</Link>
      <Link to="/add-product" style={linkStyle}>Add Product</Link>
      <Link to="/verify-product" style={linkStyle}>Verify Product</Link>
    </div>
  );
};

export default NavBar;
