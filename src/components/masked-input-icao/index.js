import React, { useState } from 'react';

const MaskedInput = ({ maxLength, value, onChange, erro }) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value.toUpperCase().replace(/[^A-Z]/g, '').substring(0, maxLength);
    onChange(inputValue);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      maxLength={maxLength}
      style={{border: erro ? '1px solid #ff0000' : '1px solid #000'}}
    />
  );
};

export default MaskedInput;