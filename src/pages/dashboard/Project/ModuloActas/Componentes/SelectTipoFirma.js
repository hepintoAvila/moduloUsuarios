import React, { useState } from 'react';
import Select from 'react-select';
import { FormInput } from '../../../../../components';
import FileUploader from '../../../../../components/FileUploader';

const SelectTipoFirma = (props) => {


  const [showInput, setShowInput] = useState(false);
  const [otroValor, setOtroValor] = useState('');

  const handleSelectChange = (selectedOption) => {
    props.setItems([{ ...props.items[0], firmaDigital: selectedOption.label }]);
    if (selectedOption.id === 2) {
      setShowInput(true);
    } else {
      setShowInput(false);
      setOtroValor('');
    }
  };

  const handleInputChange = (e) => {
    setOtroValor(e.target.value);
    props.setItems([{ ...props.items[0], nombresDigital: e.target.value }]);
  };

  const options = [
    { id: 0, label: 'Seleccione el tipo de firma...' },
    { id: 1, label: 'SIN FIRMA DIGITAL' },
    { id: 2, label: 'SUBIR FIRMA DIGITAL' },
  ];

  return (
    <div>
      <Select
        type="select"
        name="firmaDigital"
        className="react-select"
        classNamePrefix="react-select"
        onChange={handleSelectChange}
        options={options}
        placeholder="Seleccione el Tipo de Firma..."
        value={options.find(option => option.label === props.items[0].firmaDigital)}
      />
      {!showInput ? (
        <FormInput
          label={''}
          type="textarea"
          rows="2"
          name="nombresDigital"
          value={otroValor}
          onChange={handleInputChange}
          placeholder={'Digite su nombre completo'}
          containerClass={'mb-3'}
        />) : (<FileUploader
          onFileUpload={(e) => {
          const files = Array.from(e);

            const file = files[0];

            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            // Cuando la lectura del archivo termine
            reader.onload = function () {
              // Convertir el contenido del archivo a una cadena base64
              const base64String = btoa(
                new Uint8Array(reader.result)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
              );
                console.log(base64String)

              //onDateChangeFile(JSON.stringify(file),base64String,true,true)
          }

          //
          }}
      />
      )}
    </div>
  );
};

export default SelectTipoFirma;
