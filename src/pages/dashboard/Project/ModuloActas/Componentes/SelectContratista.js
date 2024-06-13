import React, { useState,useContext } from 'react';
import Select from 'react-select';
import { FormInput } from '../../../../../components';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const SelectContratista = (props) => {
  const {
    itemsAsistentes,
    setItemsAsistentes
   } = useContext(DashboardContext);
  const [showInput, setShowInput] = useState(false);
  const [otroValor, setOtroValor] = useState('');

  const handleSelectChange = (selectedOption) => {
    setItemsAsistentes([{ ...itemsAsistentes[0], contratista: selectedOption.label }]);
    if (selectedOption.id === 3) {
      setShowInput(true);
    } else {
      setShowInput(false);
      setOtroValor('');
    }
  };

  const handleInputChange = (e) => {
    setOtroValor(e.target.value);
    setItemsAsistentes([{ ...itemsAsistentes[0], otroContratista: e.target.value }]);
  };

  const options = [
    { id: 0, label: 'Seleccione el contratista...' },
    { id: 1, label: 'SI' },
    { id: 2, label: 'NO' },
    { id: 3, label: 'OTRO ¿CUAL' },
  ];

  return (
    <div>
      <Select
        type="select"
        name="contratista"
        className="react-select"
        classNamePrefix="react-select"
        onChange={handleSelectChange}
        options={options}
        placeholder="Seleccione el contratista..."
        value={options.find(option => option.label === itemsAsistentes[0].contratista)}
      />
      {showInput && (
         <FormInput
         label={'Digite el otro tipo'}
         type="textarea"
         rows="2"
         name="otroContratista"
         value={otroValor}
         onChange={handleInputChange}
         placeholder={'Especifique otro valor'}
         containerClass={'mb-3'}
     />
      )}
    </div>
  );
};

export default SelectContratista;
