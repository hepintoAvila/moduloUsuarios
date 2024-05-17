// @flow
import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
// components
import { FormInput } from '../../../../../components';
import { useActas } from '../../../../../hooks/useActas';
import  SelectContratista  from './SelectContratista';
import  SelectTipoFirma  from './SelectTipoFirma';

import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import Swal from 'sweetalert2';
const FormAsistencia = (props): React$Element<React$FragmentType> => {
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
            opcion:props?.opcion?.length > 1 ? props?.opcion: '',


        },
    ]);

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
            ? Object.keys(datosEvent)
                  .map((key) => key + '=' + btoa(datosEvent[key]))
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
                    label={'NOMBRES Y APELLIDOS'}
                    type="textarea"
                    rows="2"
                    name="nombresApellidos"
                    value={items[0]?.nombre}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                nombre: e.target.value,
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
                    value={items[0]?.fecha}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                fecha: e.target.value,
                            },
                        ])
                    }
                    placeholder={'No. DOCUMENTO'}

                />
                <div className="mb-3 mb-0 text-center"></div>
                <SelectContratista items={{...items[0]}}/>
                <div className="mb-3 mb-0 text-center"></div>
                <FormInput
                    label={''}
                    type="textarea"
                    name="dependencia"
                    value={items[0]?.dependencia}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
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
                    name="secretario"
                    value={items[0]?.Email}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                Email: e.target.value,
                            },
                        ])
                    }
                    placeholder={'CORREO ELECTRÓNICO'}
                    containerClass={'mb-3'}
                />
                   <FormInput
                    label={''}
                    type="text"
                    name="Telefono"
                    value={items[0]?.Telefono}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                Telefono: e.target.value,
                            },
                        ])
                    }
                    placeholder={'TELÉFONO/EXT.SENA'}
                    containerClass={'mb-3'}
                />
                 <Select
                  type="select"
                  name="Autorizacion"
                  className="react-select"
                  classNamePrefix="react-select"
                  onChange={(e) => setItems([{
                    ...items[0], Autorizacion: e.value,
                    }])}
                  options={[{"label":'SI'},{"label":'NO'}]}
                  placeholder="Selecione la autorizacion..."
                  selected={''}
                />
                <div className="mb-3 mb-0 text-center"></div>
                 <SelectTipoFirma items={{...items[0]}}/>
                <div className="mb-3 mb-0 text-center"></div>
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

export default FormAsistencia;
