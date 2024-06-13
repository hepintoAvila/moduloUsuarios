// @flow
import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';

// components
import { FormInput, VerticalForm } from '../../../../../components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
//import { ValidadorContext } from '../../../../../layouts/context/ValidadorContext';

import Swal from 'sweetalert2';
const FieldsSanciones = (props): React$Element<React$FragmentType> => {
    const { getData ,query} = useContext(NotificacionesContext);

    const { setSignUpModalAdd } = useContext(DashboardContext);
      const {objAprendiz}= props;
    const [items, setItems] = useState([
        {
            idSancion:objAprendiz?.idSancion > 0 ? objAprendiz?.idSancion :  0,
            idAprendiz:objAprendiz?.idAprendiz > 0 ? objAprendiz?.idAprendiz : 0,
            academica :objAprendiz?.academica > 0 ? objAprendiz?.academica :  0,
            disciplinaria:objAprendiz?.disciplinaria > 0 ? objAprendiz?.disciplinaria :  0,
            inasistencias:objAprendiz?.inasistencias > 0 ? objAprendiz?.inasistencias :  0,
            verbal:objAprendiz?.verbal > 0 ? objAprendiz?.verbal: 0,
            escrito:objAprendiz?.escrito> 0 ? objAprendiz?.escrito: 0,
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
          console.log(datosEvent);

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
            getData(queryDatos);
          query('ModuloAprendiz', 'aprendiz', [{ opcion: btoa('listaAprendiz'), obj: 'aprendiz' }]);
        }, 2000);
        setSignUpModalAdd(true);
        return (window.location.hash = '#/dashboard/ModuloAprendiz/Aprendiz');
    };


    const schemaResolver = yupResolver(
      yup.object().shape({
        academica: yup.number().required().typeError("Ingresar Falta disciplinaria"),
        disciplinaria: yup.number().required().typeError("Ingresar Falta disciplinaria"),
        inasistencias: yup.number().required().typeError("Ingresa las inasistencias"),
        verbal: yup.number().required().typeError("Ingresar llmado verbal"),
        escrito: yup.number().required().typeError("Ingresar llmado escrito"),
      })
  );


   // let validador = localStorage.getItem('VALIDADOR');

    //console.log('validador',validador);
    return (
        <>

           <VerticalForm
                    onSubmit={Registrarse}
                    resolver={schemaResolver}
                    defaultValues={{ academica: '', disciplinaria: '' , inasistencias: '',verbal:'',escrito:'' }}>


                <FormInput
                    label={'Falta Academica'}
                    min={0}
                    max={9}
                    type="number"
                    name="academica"
                    value={items[0]?.academica}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                academica: parseInt(e.target.value),
                            },
                        ])
                    }
                    placeholder={'Digite La Falta Academica'}
                    containerClass={'mb-3'}
                />
                <FormInput
                    label={'Falta Disciplinaria'}
                    type="number"
                    name="disciplinaria"
                    value={items[0]?.disciplinaria}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                disciplinaria : parseInt(e.target.value),
                            },
                        ])
                    }
                    placeholder={'Digite La Falta Disciplinaria'}
                    containerClass={'mb-3'}
                />
                <FormInput
                    label={'Cuantas inasistencias Del Aprendiz'}
                    type="number"
                    name="inasistencias"
                    value={items[0]?.inasistencias }
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                inasistencias : parseInt(e.target.value),
                            },
                        ])
                    }
                    placeholder={'Digite La Cantidad De Inasistencias'}
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'LLamado Verbal'}
                    type="number"
                    name="verbal"
                    value={items[0]?.verbal}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                verbal: parseInt(e.target.value),
                            },
                        ])
                    }
                    placeholder={'Digite Los Llamados Verbal'}
                    containerClass={'mb-3'}
                />
                <FormInput
                    label={'LLamados escrito'}
                    type="number"
                    name="escrito"
                    value={items[0]?.escrito}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                escrito: parseInt(e.target.value),
                            },
                        ])
                    }
                    placeholder={'Digite Los Llamados Escrito'}
                    containerClass={'mb-3'}
                />

                <div className="mb-3 mb-0 text-center"></div>


            <div className="mb-6 mb-2 text-center">
            <Button
                variant="success"
                type="submit"
                className="btn btn-success"
                style={{ marginTop: '25px' }}
                onClick={() => Registrarse({ ...items },props?.opcion)}>
                Registrar Sanciones Aprendiz
            </Button>

            </div>
            </VerticalForm>

        </>
    );
};

export default FieldsSanciones;
