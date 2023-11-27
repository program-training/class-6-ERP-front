import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Header = () => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/products');
  };

  return (
    <Box sx={headerStyle} onClick={handleTitleClick}>
      <Typography variant="h4">Inventory Management</Typography>
    </Box>
  );
};

// Styles
const headerStyle: React.CSSProperties = {
  backgroundColor: 'grey.A700', // MUI color
  color: '#fff',
  padding: '1rem',
  textAlign: 'center',
  cursor: 'pointer',
};

export default Header;
