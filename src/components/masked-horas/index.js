import React, { useState } from 'react';

const MaskedInput = ({value, onChange}) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value
    onChange(inputValue);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      maxLength={7}
      style={{border: '1px solid #000', width:80}}
    />
  );
};

export default MaskedInput;