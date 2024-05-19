// @flow
import React, {  useContext } from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
// components
import { FormInput } from '../../../../../components';
//import { useActas } from '../../../../../hooks/useActas';
import  SelectContratista  from './SelectContratista';
import  SelectTipoFirma  from './SelectTipoFirma';

import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import Swal from 'sweetalert2';
const FormAsistencia = (props): React$Element<React$FragmentType> => {
  const { getData } = useContext(NotificacionesContext);

    const {
      setSignUpModalAdd,
      itemsAsistentes,
      setItemsAsistentes
     } = useContext(DashboardContext);
    // const {query} = useActas();

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
            ? Object.keys(datosEvent)
                  .map((key) => key + '=' + btoa(datosEvent[key]))
                  .join('&')
            : '';

        setTimeout(function () {
          console.log('queryDatos',datosEvent)
            getData(queryDatos);
            //query('ModuloActas', 'actas', [{ opcion: btoa('listActas'), obj: 'actas' }]);
        }, 2000);
        setSignUpModalAdd(true);
    };
    const optionsAutorizacion = [
      { id: 0, label: 'Seleccione la autorización...' },
      { id: 1, label: 'SI' },
      { id: 2, label: 'NO' },
    ];
    const handleSelectChangeAuto = (selectedOption) => {
      setItemsAsistentes([{ ...itemsAsistentes[0], autorizacion: selectedOption.label }]);
    };
    const handleSelectChangePlanta = (selectedOption) => {
      setItemsAsistentes([{ ...itemsAsistentes[0], planta: selectedOption.label }]);
    };

    return (
        <>
            <form className="formModal">
                <FormInput
                    label={'NOMBRES Y APELLIDOS'}
                    type="textarea"
                    rows="2"
                    name="nombresApellidos"
                    value={itemsAsistentes[0]?.nombresApellidos}
                    onChange={(e) =>
                      setItemsAsistentes([
                            {
                                ...itemsAsistentes[0],
                                nombresApellidos: e.target.value,
                            },
                        ])
                    }
                    placeholder={'NOMBRES Y APELLIDOS'}
                    containerClass={'mb-3'}
                />
                <FormInput
                    label={''}
                    type="text"
                    containerClass={'mb-3'}
                    name="documento"
                    value={itemsAsistentes[0]?.fecha}
                    onChange={(e) =>
                      setItemsAsistentes([
                            {
                                ...itemsAsistentes[0],
                                documento: e.target.value,
                            },
                        ])
                    }
                    placeholder={'No. DOCUMENTO'}

                />
                <div className="mb-3 mb-0 text-center"></div>
                <SelectContratista/>
                <div className="mb-3 mb-0 text-center"></div>
                <FormInput
                    label={''}
                    type="textarea"
                    name="dependencia"
                    value={itemsAsistentes[0]?.dependencia}
                    onChange={(e) =>
                      setItemsAsistentes([
                            {
                                ...itemsAsistentes[0],
                                dependencia: e.target.value,
                            },
                        ])
                    }
                    placeholder={'DEPENDENCIA/EMPRESA'}
                    containerClass={'mb-3'}
                />
                <FormInput
                    label={''}
                    type="text"
                    name="email"
                    value={itemsAsistentes[0]?.email}
                    onChange={(e) =>
                      setItemsAsistentes([
                            {
                                ...itemsAsistentes[0],
                                email: e.target.value,
                            },
                        ])
                    }
                    placeholder={'CORREO ELECTRÓNICO'}
                    containerClass={'mb-3'}
                />
                   <FormInput
                    label={''}
                    type="text"
                    name="telefono"
                    value={itemsAsistentes[0]?.telefono}
                    onChange={(e) =>
                      setItemsAsistentes([
                            {
                                ...itemsAsistentes[0],
                                telefono: e.target.value,
                            },
                        ])
                    }
                    placeholder={'TELÉFONO/EXT.SENA'}
                    containerClass={'mb-3'}
                />
                <Select
                  type="select"
                  name="planta"
                  className="react-select"
                  classNamePrefix="react-select"
                  onChange={handleSelectChangePlanta}
                  options={optionsAutorizacion}
                  value={optionsAutorizacion.find(option => option.label === itemsAsistentes[0].planta)}
                  placeholder="Selecione si es de planta..."
                  selected={''}
                />
                 <Select
                  type="select"
                  name="autorizacion"
                  className="react-select"
                  classNamePrefix="react-select"
                  onChange={handleSelectChangeAuto}
                  options={optionsAutorizacion}
                  value={optionsAutorizacion.find(option => option.label === itemsAsistentes[0].autorizacion)}
                  placeholder="Selecione la autorizacion..."
                  selected={''}
                />
                <div className="mb-3 mb-0 text-center"></div>
                 <SelectTipoFirma/>
                <div className="mb-3 mb-0 text-center"></div>
            </form>

            <div className="mb-6 mb-2 text-center">
            <Button
                variant="success"
                type="submit"
                className="btn btn-success"
                style={{ marginTop: '25px' }}
                onClick={() => Registrarse({ ...itemsAsistentes })}>
                Registrar Asistencia
            </Button>

            </div>

        </>
    );
};
export default FormAsistencia;
