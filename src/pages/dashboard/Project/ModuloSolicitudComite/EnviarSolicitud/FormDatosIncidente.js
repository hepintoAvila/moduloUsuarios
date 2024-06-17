/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { Button, Row,Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
// components
import { VerticalForm, FormInput } from '../../../../../components';
import HyperDatepicker from '../../../../../components/Datepicker';


import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';

function contarVerdaderos(array) {
    let contador = 0;
    for (let i = 0; i <= array.length; i++) {
        if (array[i] === true) {
            contador++;
        }
    }
    return contador;
}
const FormDatosIncidente = (props): React$Element<React$FragmentType> => {
    const children = props.children || null;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [enviar, setEnviar] = useState(false);
    const { convertirFecha } = useContext(NotificacionesContext);
    const { validateError, setError, queryFile, loading, nombrePrograma, descripcion, fallas } =
        useContext(SearchContext);

    //console.log({...fallas[0]})

    const [items, setItems] = useState([
        {
            idAprendiz: '',
            tipoComite: '',
            tipoAtencion: '',
            fechaIncidente: '',
            accion: 'ModuloEnviarComite',
            opcion: 'add_solicitud',
            tipo: 'EnviarSolicitud',
            selectedFile: '',
            base64String: '',
            descripcion: descripcion,
            nombrePrograma: nombrePrograma,
        },
    ]);

    const { t } = useTranslation();
    const schemaResolver = yupResolver(yup.object().shape({}));
    const onSubmit = () => {
        setEnviar(!enviar);
    };

    const onDateChangefechaIncidente = (date, fechaError) => {
        if (date) {
            setSelectedDate(date);
            setError({ ...validateError, fechaError: fechaError });
            setItems([
                {
                    ...items[0],
                    fechaIncidente: date,
                    idAprendiz: props?.idAprendiz,
                },
            ]);
        }
    };

    const onChangeTipoAtencion = (value, tipoAtencionError) => {
        if (value) {
            setError({ ...validateError, tipoAtencionError: tipoAtencionError });
            setItems([
                {
                    ...items[0],
                    tipoAtencion: value,
                    idAprendiz: props?.idAprendiz,
                },
            ]);
        }
    };
    const onChangeTipoComite = (value, comiteError) => {
        if (value) {
            setError({ ...validateError, comiteError: comiteError });
            setItems([
                {
                    ...items[0],
                    tipoComite: value,
                    idAprendiz: props?.idAprendiz,
                },
            ]);
        }
    };

    useEffect(() => {
        if (enviar) {
            const obj = Object.values({ ...validateError });
            let numtrue = contarVerdaderos(obj);

            if (Number(numtrue) === 8) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Solicitud Enviada',
                    showConfirmButton: false,
                    timer: 1500,
                });
                const datosfiles = {
                    idAprendiz: items[0].idAprendiz,
                    tipoComite: items[0].tipoComite,
                    tipoAtencion: items[0].tipoAtencion,
                    fechaIncidente: convertirFecha(items[0].fechaIncidente),
                    accion: 'ModuloSolicitudComite',
                    opcion: 'add_solicitud',
                    tipo: 'EnviarSolicitud',
                    selectedFile: items[0].selectedFile,
                    descripcion: descripcion,
                    nombrePrograma: nombrePrograma,
                    ...fallas[0],
                };

                const queryDatos = datosfiles
                    ? Object.keys(datosfiles)
                          .map((key) => key + '=' + btoa(datosfiles[key]))
                          .join('&')
                    : '';
                queryFile(queryDatos, items[0].base64String);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'ERROR:: FALTAN CAMPOS POR DILIGENCIAR',
                });
            }
        }
    }, [enviar]);

    return (
        <>
            {loading ? (
                <Redirect to={`/ModuloSolicitudComite/EnviarSolicitud?p=${items[0]?.idAprendiz}`}></Redirect>
            ) : null}

            <VerticalForm
                onSubmit={onSubmit}
                resolver={schemaResolver}
                defaultValues={{}}
                className={classNames('col-4')}>
                <Row className=" mb-5">
                    <div
                        className="mb-3 mb-4 text-center btnenviarSolicitud"
                        style={{ marginLeft: '400px', marginTop: '-80px' }}>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('ENVIAR SOLICITUD')}
                        </Button>
                    </div>
                </Row>
                <Row>
                    <Card className={classNames('widget-flat')}>
                        <Card.Body>
                            {!props?.aprendizError ? (
                                <div className="hederComponente">SELECCIONE EL APRENDIZ</div>
                            ) : (
                              <div className="hederComponente">APRENDIZ SELECCIONADO</div>
                            )}
                            {children}
                            <br />
                            <Row className="align-items-center">
                                <br />
                                <br />
                                <br />
                                <div className="mb-3">
                                <div className="hederComponente">TIPOS DE FALTAS Y CALIFICACIONES</div>
                                <br />
                                <FormInput
                                    name="tipoComite"
                                    label="Seleccione el tipo de falta"
                                    type="select"
                                    containerClass="mb-3"
                                    className="form-select"
                                    key="tipoComite"
                                    isInvalid={!validateError.comiteError}
                                    onChange={(e) => onChangeTipoComite(e.target.value, true)}>
                                    <option value="ACADEMICO"> ACADEMICO</option>
                                    <option value="DISCIPLINARIO">DISCIPLINARIO</option>
                                    <option value="ACADEMICO Y DISCIPLINARIO">ACADEMICO Y DISCIPLINARIO</option>
                                </FormInput>
                                <FormInput
                                    name="tipoAtencion"
                                    label="Seleccione la calificación de la falta"
                                    type="select"
                                    containerClass="mb-3 font-weight-bold"
                                    className="form-select"
                                    key="tipoAtencion"
                                    isInvalid={!validateError.tipoAtencionError}
                                    onChange={(e) => onChangeTipoAtencion(e.target.value, true)}>
                                    <option>Seleccione...</option>
                                    <option value="Leve">Leve</option>
                                    <option value="Grave">Grave</option>
                                    <option value="Gravisimas">Gravísimas</option>
                                </FormInput>
                                </div>
                                <div className="mb-3">

                                    <div className="hederComponente">Fecha y Hora de los Hecho</div>
                                  <br />
                                    <HyperDatepicker
                                        label=""
                                        name="fechaIncidente"
                                        hideAddon={true}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        tI={60}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                        className="form-control"
                                        value={selectedDate}
                                        onChange={(e) => onDateChangefechaIncidente(e, true)}
                                    />
                                      {!validateError.fechaError ? (
                                        <div className="hederComponente">Seleccione la fecha y hora del incidente</div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
                <br />
                <br />
                <br />
            </VerticalForm>
        </>
    );
};

export default FormDatosIncidente;
