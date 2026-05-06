import React from 'react';

const BrandLogo = ({ fontSize = '2rem' }) => {
  const logoStyle = {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: fontSize,
    display: 'inline-block',
    letterSpacing: '-1px',
  };

  return (
    <div className="lunar-cart-logo" style={logoStyle}>
      <span style={{ color: '#000000' }}>Lunar</span>
      <span style={{ color: '#FF8C00' }}>Cart</span>
    </div>
  );
};

export default BrandLogo;