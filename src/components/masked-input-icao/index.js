import React, { useState } from 'react';

const MaskedInput = ({ maxLength, value, onChange, erro, onKeyPress, id = ''}) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value.toUpperCase().replace(/[^A-Z]/g, '').substring(0, maxLength);
    onChange(inputValue);
  };

  return (
    <input
      type="text"
      id={id}
      value={value}
      onChange={handleInputChange}
      maxLength={maxLength}
      style={{border: erro ? '1px solid #ff0000' : '1px solid #000'}}
      onKeyPress={onKeyPress}
    />
  );
};

export default MaskedInput;