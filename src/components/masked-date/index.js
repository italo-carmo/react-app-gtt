import React from 'react';

const DateMaskedInput = ({ value, onChange }) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Remove caracteres não numéricos
    const numericValue = inputValue.replace(/\D/g, '');

    // Formata o valor no formato de data
    let formattedValue = '';
    if (numericValue.length > 0) {
      formattedValue += numericValue.substring(0, 2);
      if (numericValue.length >= 3) {
        formattedValue += '/' + numericValue.substring(2, 4);
        if (numericValue.length >= 5) {
          formattedValue += '/' + numericValue.substring(4, 8);
        }
      }
    }

    onChange(formattedValue);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default DateMaskedInput;
