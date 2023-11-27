import React from 'react';



const HeaderLogine = () => {
  return (
    <div style={headerStyle}>
      <h1 >Inventory Management</h1>
    </div>
  );
};

// Styles
const headerStyle: React.CSSProperties = {
  background: 'grey', // Use your preferred color
  color: '#fff',
  padding: '1rem',
  textAlign: 'center',
};

export default HeaderLogine;
