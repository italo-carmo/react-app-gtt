import React, { useState } from 'react';

const MaskedInput = ({value, onChange, disabled}) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value.toUpperCase().replace(/[^0-9]/g, '').substring(0, 5);
    onChange(inputValue);
  };

  return (
    <input
      type="number"
      value={value}
      onChange={handleInputChange}
      maxLength={5}
      disabled={disabled}
      style={{border: '1px solid #000', backgroundColor: disabled ? '#fff' : '#fff'}}
    />
  );
};

export default MaskedInput;