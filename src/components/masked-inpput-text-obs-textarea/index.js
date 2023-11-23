import React, { useState } from 'react';

const MaskedInput = ({value, onChange}) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value
    onChange(inputValue);
  };

  return (
    <textarea
      type="text"
      value={value}
      onChange={handleInputChange}
      maxLength={255}
      style={{border: '1px solid #000', borderRadius:10, width: '100%', marginTop:5}}

    ></textarea>
  );
};

export default MaskedInput;