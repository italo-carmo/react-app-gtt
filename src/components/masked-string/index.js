import React, { useState } from 'react';

const MaskedInput = ({value, onChange}) => {
  const handleInputChange = (event) => {
    console.log('text')
    const inputValue = event.target.value
    onChange(inputValue);
  };

  return (
    <input
      value={value}
      onChange={handleInputChange}
      style={{border: '1px solid #000', width: '100%'}}
    />
  );
};

export default MaskedInput;