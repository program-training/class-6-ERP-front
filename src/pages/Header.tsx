import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const nav = useNavigate()
  return (
    <div style={headerStyle}>
      <h1 onClick={() =>{
        nav('/products')
      }}>Inventory Management</h1>
    </div>
  );
};

// Styles
const headerStyle: React.CSSProperties = {
  background: 'grey', // Use your preferred color
  color: '#fff',
  padding: '1rem',
  textAlign: 'center',
  position :'sticky',
  
};

export default Header;
