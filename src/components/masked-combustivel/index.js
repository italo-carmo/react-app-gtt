import React, { useState } from 'react';

const MaskedInput = ({value, onChange}) => {
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
      style={{border: '1px solid #000'}}
    />
  );
};

export default MaskedInput;