import React, { useState } from 'react';

const TimeMaskedInput = ({ value, onChange }) => {
    const [deleteKey, setDeleteKey] = useState(false)
  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Remove caracteres não numéricos
    const numericValue = inputValue.replace(/\D/g, '');

    // Formata o valor no formato de hora
    let formattedValue = '';
    if (numericValue.length > 0) {
      formattedValue += numericValue.substring(0, 2);
      if (numericValue.length >= 3) {
        formattedValue += ':' + numericValue.substring(2, 4);
        if (numericValue.length >= 4 && !deleteKey) {
          formattedValue += 'Z';
        }
      }
    }

    onChange(formattedValue);
  };

  const handleKeyDown = (event) => {
    // Verifica se a tecla pressionada é "Delete" ou "Backspace"
    if (event.key === 'Delete' || event.key === 'Backspace') {
      // Verifica se não há nada digitado ou o cursor está no início do campo
        setDeleteKey(true)
    } else {
        setDeleteKey(false)
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default TimeMaskedInput;
