// @flow
import React, {  useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
// components
import { FormInput } from '../../../../../components';
//import { useActas } from '../../../../../hooks/useActas';

import  SelectTipoFirma  from './SelectTipoFirma';

import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import Swal from 'sweetalert2';
import { useSecurity } from '../../../../../layouts/context/SecurityProvider';

const SelectContratista = (props) => {

  const [showInput, setShowInput] = useState(false);
  const [otroValor, setOtroValor] = useState('');

  const handleSelectChange = (selectedOption) => {
    props.setItems([{ ...props.items[0], contratista: selectedOption.label }]);
    if (selectedOption.id === 3) {
      setShowInput(true);
    } else {
      setShowInput(false);
      setOtroValor('');
    }
  };

  const handleInputChange = (e) => {
    setOtroValor(e.target.value);
    props.setItems([{ ...props.items[0], otroContratista: e.target.value }]);
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
        value={options.find(option => option.label === props.items[0].contratista)}
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

const FormAsistencia = (props): React$Element<React$FragmentType> => {
  const { getData } = useContext(NotificacionesContext);
  const { errors,checkSpecialChars } = useSecurity(); // Usamos el hook useSecurity

  const {
      setSignUpModalAdd,
      itemsAsistentes,
     } = useContext(DashboardContext);
     const [items, setItems] = useState(itemsAsistentes)

     const handleChange = (field) => (e) => {
      const value = e.target.value;
      checkSpecialChars(field, value);
      setItems((prevItems) => {
        const newItems = [...prevItems];
        newItems[0] = {
          ...newItems[0],
          [field]: value,
        };
        return newItems;
      });
    };

    const Registrarse = (items) => {

        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Registro Enviado',
            showConfirmButton: false,
            timer: 1500,
        });
        const datosEvent = {

            ...items[0],
            idActa:props.idActa,
            accion: 'ModuloActas',
            opcion: 'addAsistente',
            tipo: 'actas',
        };
        const queryDatos = datosEvent
        ? Object.entries(datosEvent)
            .map(([key, value]) => {
              // Eliminar comillas simples de los valores si existen
              //const cleanValue = value.replace(/'/g, '');
              // Codificar el valor limpio en base64
              const encodedValue = btoa(value);
              return `${key}=${encodedValue}`;
            })
            .join('&')
        : '';

        setTimeout(function () {
          console.log('queryDatos',datosEvent)
            getData(queryDatos);
        }, 2000);
        setSignUpModalAdd(true);
    };
    const optionsAutorizacion = [
      { id: 0, label: 'Seleccione la autorización...' },
      { id: 1, label: 'SI' },
      { id: 2, label: 'NO' },
    ];
    const handleSelectChangeAuto = (selectedOption) => {
      setItems([{ ...items[0], autorizacion: selectedOption.label }]);
    };
    const handleSelectChangePlanta = (selectedOption) => {
      setItems([{ ...items[0], planta: selectedOption.label }]);
    };

    return (
        <>
            <form className="formModal">
            <FormInput
                  label={'NOMBRES Y APELLIDOS'}
                  type="textarea"
                  rows="5"
                  name="nombresApellidos"
                  value={items[0]?.nombresApellidos}
                  onChange={handleChange('nombresApellidos')}
                  placeholder={'NOMBRES Y APELLIDOS'}
                  containerClass={`mb-3 ${errors.nombresApellidos?.hasSpecialChar || errors.nombresApellidos?.isEmpty ? 'bg-alert' : ''}`}
                />
                  <div className="mb-3 mb-0 text-center"></div>
                  <FormInput
                  label={'No. DOCUMENTO'}
                  type="number"
                  name="documento"
                  value={items[0]?.documento}
                  onChange={handleChange('documento')}
                  placeholder={'No. DOCUMENTO'}
                  containerClass={`mb-3 ${errors.documento?.hasSpecialChar || errors.documento?.isEmpty ? 'bg-alert' : ''}`}
                />
                <div className="mb-3 mb-0 text-center"></div>
                <SelectContratista items={items} setItems={setItems}/>
                <div className="mb-3 mb-0 text-center"></div>

                <FormInput
                  label={'DEPENDENCIA/EMPRESA'}
                  type="textarea"
                  name="dependencia"
                  rows="5"
                  value={items[0]?.dependencia}
                  onChange={handleChange('dependencia')}
                  placeholder={'DEPENDENCIA/EMPRESA'}
                  containerClass={`mb-3 ${errors.dependencia?.hasSpecialChar || errors.dependencia?.isEmpty ? 'bg-alert' : ''}`}
                />
                <div className="mb-3 mb-0 text-center"></div>
                <FormInput
                  label={'CORREO ELECTRÓNICO'}
                  type="text"
                  name="email"
                  value={items[0]?.email}
                  onChange={handleChange('email')}
                  placeholder={'CORREO ELECTRÓNICO'}
                  containerClass={`mb-3 ${errors.email?.hasSpecialChar || errors.email?.isEmpty ? 'bg-alert' : ''}`}
                />
              <div className="mb-3 mb-0 text-center"></div>
              <FormInput
                  label={'TELÉFONO/EXT.SENA'}
                  type="number"
                  name="telefono"
                  value={items[0]?.telefono}
                  onChange={handleChange('telefono')}
                  placeholder={'TELÉFONO/EXT.SENA'}
                  containerClass={`mb-3 ${errors.telefono?.hasSpecialChar || errors.telefono?.isEmpty ? 'bg-alert' : ''}`}
                />
                <div className="mb-3 mb-0 text-left">ES DE PLANTA?</div>
                <Select
                  type="select"
                  name="planta"
                  className="react-select"
                  classNamePrefix="react-select"
                  onChange={handleSelectChangePlanta}
                  options={optionsAutorizacion}
                  value={optionsAutorizacion.find(option => option.label === items[0].planta)}
                  placeholder="Selecione si es de planta..."
                  selected={''}
                />
                <br/>
                <div className="mb-3 mb-0 text-left">AUTORIZACION</div>
                 <Select
                  type="select"
                  name="autorizacion"
                  className="react-select"
                  classNamePrefix="react-select"
                  onChange={handleSelectChangeAuto}
                  options={optionsAutorizacion}
                  value={optionsAutorizacion.find(option => option.label === items[0].autorizacion)}
                  placeholder="Selecione la autorizacion..."
                  selected={''}
                />
                <div className="mb-3 mb-0 text-center"></div>
                 <SelectTipoFirma items={items} setItems={setItems}/>
                <div className="mb-3 mb-0 text-center"></div>
            </form>

            <div className="mb-6 mb-2 text-center">
            <Button
                variant="success"
                type="submit"
                className="btn btn-success"
                style={{ marginTop: '25px' }}
                onClick={() => Registrarse({ ...items })}>
                Registrar Asistencia
            </Button>

            </div>

        </>
    );
};
export default FormAsistencia;
