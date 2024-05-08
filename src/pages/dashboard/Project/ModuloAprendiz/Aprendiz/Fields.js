// @flow
import React, { useState, useContext,useEffect } from 'react';
import { Button } from 'react-bootstrap';

// components
import { FormInput } from '../../../../../components';
import { useAprendiz } from '../../../../../hooks/useAprendiz';

import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import Swal from 'sweetalert2';
const Fields = (props): React$Element<React$FragmentType> => {
    const { getData } = useContext(NotificacionesContext);
    const {query} = useAprendiz();
    const { setSignUpModalAdd } = useContext(DashboardContext);
      const {objAprendiz}= props;
    const [items, setItems] = useState([
        {
            idAprendiz:props?.idAprendiz > 0 ? props?.idAprendiz : 0,
            nombres:objAprendiz?.nombres?.length > 1 ? objAprendiz?.nombres : '',
            apellidos:objAprendiz?.apellidos?.length > 1 ? objAprendiz?.apellidos : '',
            tipoIdentificacion:objAprendiz?.tipoIdentificacion?.length > 1 ? objAprendiz?.tipoIdentificacion : '',
            identificacion:objAprendiz?.identificacion?.length > 1 ? objAprendiz?.identificacion: '',
            telefono:objAprendiz?.telefono?.length > 1 ? objAprendiz?.telefono: '',
            correo:objAprendiz?.correo?.length > 1 ? objAprendiz?.correo: '',
            direccion:objAprendiz?.direccion?.length > 1 ? objAprendiz?.direccion: '',
            programaFormacion:objAprendiz?.programaFormacion?.length > 1 ? objAprendiz?.programaFormacion: '',
            proyectoFormativo:objAprendiz?.proyectoFormativo?.length > 1 ? objAprendiz?.proyectoFormativo: '',
            jornada:objAprendiz?.jornada?.length > 1 ? objAprendiz?.jornada: '',
            etapa:objAprendiz?.etapa?.length > 1 ? objAprendiz?.etapa: '',
            ficha:objAprendiz?.ficha?.length > 1 ? objAprendiz?.ficha: '',
            municipio:objAprendiz?.municipio?.length > 1 ? objAprendiz?.municipio: '',
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
            accion: 'ModuloAprendiz',
            opcion: opcion,
            tipo: 'aprendiz',
        };


        const queryDatos = datosEvent
            ? Object.keys(datosEvent)
                  .map((key) => key + '=' + btoa(datosEvent[key]))
                  .join('&')
            : '';

        setTimeout(function () {
            getData(queryDatos);
            query('ModuloAprendiz', 'aprendiz', [{ opcion: btoa('listaAprendiz'), obj: 'aprendiz' }]);
        }, 2000);
        setSignUpModalAdd(true);
        return (window.location.hash = '#/dashboard/ModuloAprendiz/Aprendiz');
    };




    return (
        <>
            <form className="formModal">
                <FormInput
                    label={'Nombre'}
                    type="text"
                    name="nombres"
                    value={items[0]?.nombres}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                nombres: e.target.value,
                            },
                        ])
                    }
                    placeholder={'Digite Su Nombre'}
                    containerClass={'mb-3'}
                />
                <FormInput
                    label={'Apellido'}
                    type="text"
                    name="apellidos"
                    value={items[0]?.apellidos}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                apellidos: e.target.value,
                            },
                        ])
                    }
                    placeholder={'Digite Su Apellido'}
                    containerClass={'mb-3'}
                />
                <FormInput
                    label={'Tipo Identificacion'}
                    type="text"
                    name="tipoIdentificacion"
                    value={items[0]?.tipoIdentificacion}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                tipoIdentificacion: e.target.value,
                            },
                        ])
                    }
                    placeholder={'Digite Su Tipo Identificacion'}
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Identificacion'}
                    type="text"
                    name="identificacion"
                    value={items[0]?.identificacion}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                identificacion: e.target.value,
                            },
                        ])
                    }
                    placeholder={'Digite Su Identificacion'}
                    containerClass={'mb-3'}
                />
                <FormInput
                    label={'Telefono'}
                    type="text"
                    name="telefono"
                    value={items[0]?.telefono}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                telefono: e.target.value,
                            },
                        ])
                    }
                    placeholder={'Digite Su Telefono'}
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Correo'}
                    type="email"
                    name="correo"
                    value={items[0]?.correo}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                correo: e.target.value,
                            },
                        ])
                    }
                    placeholder={'Digite Su Correo'}
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Direccion'}
                    type="text"
                    name="direccion"
                    value={items[0]?.direccion}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                direccion: e.target.value,
                            },
                        ])
                    }
                    placeholder={'Digite Su Direccion'}
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Programa Formacion'}
                    type="text"
                    name="programaFormacion"
                    value={items[0]?.programaFormacion}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                programaFormacion: e.target.value,
                            },
                        ])
                    }
                    placeholder={'Digite Su Correo'}
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Proyecto Formativo'}
                    type="text"
                    name="proyectoFormativo"
                    value={items[0]?.proyectoFormativo}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                proyectoFormativo: e.target.value,
                            },
                        ])
                    }
                    placeholder={'Digite Su Proyecto Formativo'}
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Jornada'}
                    type="text"
                    name="jornada"
                    value={items[0]?.jornada}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                jornada: e.target.value,
                            },
                        ])
                    }
                    placeholder={'Digite Su Jornada'}
                    containerClass={'mb-3'}
                />
                <FormInput
                    label={'Etapa'}
                    type="text"
                    name="etapa"
                    value={items[0]?.etapa}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                etapa: e.target.value,
                            },
                        ])
                    }
                    placeholder={'Digite Su Etapa'}
                    containerClass={'mb-3'}
                />
                <FormInput
                    label={'Ficha'}
                    type="text"
                    name="ficha"
                    value={items[0]?.ficha}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                ficha: e.target.value,
                            },
                        ])
                    }
                    placeholder={'Digite Su Ficha'}
                    containerClass={'mb-3'}
                />
                <FormInput
                    label={'Municipio'}
                    type="text"
                    name="municipio"
                    value={items[0]?.municipio}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                municipio: e.target.value,
                            },
                        ])
                    }
                    placeholder={'Digite Su Municipio'}
                    containerClass={'mb-3'}
                />
                <div className="mb-3 mb-0 text-center"></div>
            </form>

            <div className="mb-6 mb-2 text-center">
            <Button
                variant="success"
                type="submit"
                className="btn btn-success"
                style={{ marginTop: '25px' }}
                onClick={() => Registrarse({ ...items },props?.opcion)}>
                Registrar Aprendiz
            </Button>

            </div>

        </>
    );
};

export default Fields;
