// @flow
import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';

// components
import { FormInput } from '../../../../../components';
import { useActas } from '../../../../../hooks/useActas';

import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import Swal from 'sweetalert2';
import { useSecurity } from '../../../../../layouts/context/SecurityProvider';


const Fields = (props): React$Element<React$FragmentType> => {
  const { errors,checkSpecialChars } = useSecurity(); // Usamos el hook useSecurity


  const { getData } = useContext(NotificacionesContext);
    const {query} = useActas();
    const { setSignUpModalAdd } = useContext(DashboardContext);
      const {objActa}= props;
    const [items, setItems] = useState([
        {
            idActa:props?.idActa > 0 ? props?.idActa : 0,
            nombre:objActa?.nombre?.length > 1 ? objActa?.nombre : '',
            fecha:objActa?.fecha?.length > 1 ? objActa?.fecha : '',
            horaInicial:objActa?.horaInicial?.length > 1 ? objActa?.horaInicial : '',
            horaFinal:objActa?.horaFinal?.length > 1 ? objActa?.horaFinal: '',
            secretario:objActa?.secretario?.length > 1 ? objActa?.secretario: '',
            presentacion:objActa?.presentacion?.length > 1 ? objActa?.presentacion: '',
            opcion:props?.opcion?.length > 1 ? props?.opcion: '',


        },
    ]);
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

    const Registrarse = (items,opcion) => {

        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Registro Enviado',
            showConfirmButton: false,
            timer: 1500,
        });
        const datosEvent = {
            ...items[0],
            accion: 'ModuloActas',
            opcion: opcion,
            tipo: 'actas',
        };


        const queryDatos = datosEvent
        ? Object.entries(datosEvent)
            .map(([key, value]) => {
              // Eliminar comillas simples de los valores si existen
              const cleanValue = value.replace(/'/g, '');
              // Codificar el valor limpio en base64
              const encodedValue = btoa(cleanValue);
              return `${key}=${encodedValue}`;
            })
            .join('&')
        : '';

        setTimeout(function () {
            getData(queryDatos);
            query('ModuloActas', 'actas', [{ opcion: btoa('listActas'), obj: 'actas' }]);
        }, 2000);
        setSignUpModalAdd(true);
        return (window.location.hash = '#/dashboard/ModuloActas/Actas');
    };

    return (
        <>
            <form className="formModal">
              <FormInput
                  label={'NOMBRE DEL COMITÉ O DE LA REUNIÓN'}
                  type="textarea"
                  rows="5"
                  name="nombre"
                  value={items[0]?.nombre}
                  onChange={handleChange('nombre')}
                  placeholder={'ACTA DEL COMITÉ DE EVALUACIÓN Y SEGUIMIENTO No.'}
                  containerClass={`mb-3 ${errors.nombre?.hasSpecialChar || errors.nombre?.isEmpty ? 'bg-alert' : ''}`}
                />
 <div className="mb-3 mb-0 text-center"></div>
                  <FormInput
                        label={'Fecha'}
                        type="date"
                        name="fecha"
                        value={items[0]?.fecha}
                        onChange={handleChange('fecha')}
                        placeholder={'Digite la Fecha'}
                        containerClass={`mb-3 ${errors.fecha?.hasSpecialChar || errors.fecha?.isEmpty ? 'bg-alert' : ''}`}
                      />
      <div className="mb-3 mb-0 text-center"></div>
                <FormInput
                    label={'Hora Inicial'}
                    type="time"
                    name="horaInicial"
                    value={items[0]?.horaInicial}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                horaInicial: e.target.value,
                            },
                        ])
                    }
                    placeholder={'Digite la Hora Final'}
                    containerClass={'mb-3'}
                />
      <div className="mb-3 mb-0 text-center"></div>
                <FormInput
                    label={'Hora Final'}
                    type="time"
                    name="horaFinal"
                    value={items[0]?.horaFinal}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                horaFinal: e.target.value,
                            },
                        ])
                    }
                    placeholder={'Digite la Hora Final'}
                    containerClass={'mb-3'}
                />
                <div className="mb-3 mb-0 text-center"></div>
                <FormInput
                  label={'Secretario'}
                  type="text"
                   name="secretario"
                  value={items[0]?.secretario}
                  onChange={handleChange('secretario')}
                  placeholder={'Secretario.'}
                  containerClass={`mb-3 ${errors.secretario?.secretario || errors.secretario?.isEmpty ? 'bg-alert' : ''}`}
                />
                <div className="mb-3 mb-0 text-center"></div>
                <FormInput
                  label={'PRESENTACION'}
                  type="textarea"
                  rows="5"
                  name="presentacion"
                  value={items[0]?.presentacion}
                  onChange={handleChange('presentacion')}
                  placeholder={'PRESENTACION.'}
                  containerClass={`mb-3 ${errors.presentacion?.hasSpecialChar || errors.presentacion?.isEmpty ? 'bg-alert' : ''}`}
                />

            </form>

            <div className="mb-6 mb-2 text-center">
            <Button
                variant="success"
                type="submit"
                className="btn btn-success"
                style={{ marginTop: '25px' }}
                onClick={() => Registrarse({ ...items },props?.opcion)}>
                Registrar Acta
            </Button>

            </div>

        </>
    );
};

export default Fields;
