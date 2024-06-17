/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext,useState } from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import {  Row,Card } from 'react-bootstrap';

// components

import HyperDatepicker from '../../../../../components/Datepicker';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
import FormInput from '../../../components/FormInput';
import { DatosSolicitudContext } from '../../../../../layouts/context/DatosComiteContext';

const FormDatosIncidente = (props): React$Element<React$FragmentType> => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { validateError, setError, loading } =
        useContext(SearchContext);

        const { itemsSolicitud, setItemsSolicitud} =
        useContext(DatosSolicitudContext);
    //console.log({...fallas[0]})
/*
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
*/


    const onDateChangefechaIncidente = (date, fechaError) => {
        if (date) {
            setSelectedDate(date);
            setError({ ...validateError, fechaError: fechaError });
            setItemsSolicitud([
                {
                    ...itemsSolicitud[0],
                    fechaIncidente: date,
                    idAprendiz: props?.idAprendiz,
                },
            ]);
        }
    };

    const onChangeTipoAtencion = (value, tipoAtencionError) => {
        if (value) {
            setError({ ...validateError, tipoAtencionError: tipoAtencionError });
            setItemsSolicitud([
                {
                    ...itemsSolicitud[0],
                    tipoAtencion: value,
                    idAprendiz: props?.idAprendiz,
                },
            ]);
        }
    };
    const onChangeTipoComite = (value, comiteError) => {
        if (value) {
            setError({ ...validateError, comiteError: comiteError });
            setItemsSolicitud([
                {
                    ...itemsSolicitud[0],
                    tipoComite: value,
                    idAprendiz: props?.idAprendiz,
                },
            ]);
        }
    };


    return (
        <>
            {loading ? (
                <Redirect to={`/ModuloSolicitudComite/EnviarSolicitud?p=${itemsSolicitud[0]?.idAprendiz}`}></Redirect>
            ) : null}

                <Row>
                    <Card className={classNames('widget-flat')}>
                        <Card.Body>

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

        </>
    );
};

export default FormDatosIncidente;
