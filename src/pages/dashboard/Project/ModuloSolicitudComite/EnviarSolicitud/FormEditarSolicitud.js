/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { Row, Card, } from 'react-bootstrap';
import Swal from 'sweetalert2';

// components
import { VerticalForm, FormInput } from '../../../../../components';
import HyperDatepicker from '../../../../../components/Datepicker';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';

const FormEditarSolicitud = (props): React$Element<React$FragmentType> => {


    const [selectedDate, setSelectedDate] = useState(new Date());

    const { convertirFecha } = useContext(NotificacionesContext);
    const { getData } = useContext(NotificacionesContext);
    const { validateError, setError,loading} =
        useContext(SearchContext);
    const datosAprendiz = props?.itemsConsultarSolicitudByCodigo?.data?.Solicitudes || [];


    const update = (key, value) => {
        const datosEvent = {
            idSolicitud: props?.idSolicitud,
            opcionUpdate: key,
            e: value,
            accion: 'ModuloSolicitudComite',
            opcion: 'updateSolicitud',
            tipo: 'updateSolicitud',
        };

        Swal.fire({
            title: 'Desea actualizar este registro',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const queryDatos = Object.entries(datosEvent)
                    .map(([key, value]) => {
                        const encodedValue = btoa(value);
                        return `${key}=${encodedValue}`;
                    })
                    .join('&');

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Enviando Solicitud...',
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    getData(queryDatos);
                }, 2000);
            }
        });
    };


    const [items, setItems] = useState([
        {
            idAprendiz: '',
            tipoComite: '',
            tipoAtencion: '',
            fechaIncidente: '',
            accion: 'ModuloSolicitudComite',
            opcion: 'add_solicitud',
            tipo: 'EnviarSolicitud',
            selectedFile: '',
            base64String: '',
        },
    ]);

    const schemaResolver = yupResolver(yup.object().shape({}));
    const onDateChangefechaIncidente = (e, fechaError) => {
        if (e) {
            setSelectedDate(e);
            setError({ ...validateError, fechaError: fechaError });

            setItems([
                {
                    ...items[0],
                    fechaIncidente: convertirFecha(`${e}`),
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
                },
            ]);
        }
    };

    useEffect(() => {
        if (datosAprendiz.length === 1) {
            const objet = {
                idAprendiz: datosAprendiz[0]?.idAprendiz,
                aprendiz: datosAprendiz[0]?.aprendiz,
                tipoComite: datosAprendiz[0]?.tipoSolicitud,
                tipoAtencion: datosAprendiz[0]?.tipoAtencion,
                fechaIncidente: datosAprendiz[0]?.fechaSolicitud,
                fechaHora: datosAprendiz[0]?.fechaHora,
                accion: 'ModuloSolicitudComite',
                opcion: 'add_solicitud',
                tipo: 'EnviarSolicitud',
                selectedFile: '',
                base64String: '',
                sancionesAprendiz: datosAprendiz[0]?.sancionesAprendiz,
            };
            setItems([objet]);
        }
    }, [datosAprendiz]);
    return (
        <>
            {loading ? (
                <Redirect to={`/ModuloSolicitudComite/EnviarSolicitud?p=${items[0]?.idAprendiz}`}></Redirect>
            ) : null}
            <VerticalForm
                resolver={schemaResolver}
                defaultValues={{}}
                className={classNames('col-8')}>
                <Row>

                    <Card className={classNames('widget-flat')}>
                        <Card.Body>
                            <br />
                            <label> Seleccione el tipo de falta:</label>
                            <label className={classNames('editTitulos')}>
                                <i className="mdi mdi-account-check"></i>
                                {items[0]?.tipoComite}
                            </label>
                            <Row className="align-items-center">
                                <div className="mb-0 col-8">
                                    <FormInput
                                        name="tipoComite"
                                        label=""
                                        type="select"
                                        containerClass="mb-3"
                                        className="form-select"
                                        key="tipoComite"
                                        isInvalid={!validateError.comiteError}
                                        onChange={(e) => onChangeTipoComite(e.target.value, true)}>
                                        <option>Seleccione...</option>
                                        <option value="ACADEMICO"> ACADEMICO</option>
                                        <option value="DISCIPLINARIO">DISCIPLINARIO</option>
                                        <option value="ACADEMICO Y DISCIPLINARIO">ACADEMICO Y DISCIPLINARIO</option>
                                    </FormInput>
                                </div>
                                <div className="uploadSolicitud col-8 avatar-sm">
                                    <span className="avatar-title bg-primary-lighten text-primary rounded">
                                        <i className="mdi dripicons-cloud-upload" onClick={() => update('tipoComite', items[0]?.tipoComite)}></i>
                                    </span>
                                </div>
                            </Row>
                            <hr />
                            <Row className="align-items-center">
                                <label>Seleccione la calificación de la falta:</label>
                                <label className={classNames('editTitulos')}>
                                    <i className="mdi mdi-account-check"></i>
                                    {items[0]?.tipoAtencion}
                                </label>
                                <div className="mb-0 col-8">
                                    <FormInput
                                        name="tipoAtencion"
                                        label=""
                                        type="select"
                                        containerClass="mb-3 font-weight-bold"
                                        className="form-select"
                                        key="tipoAtencion"
                                        isInvalid={!validateError.tipoAtencionError}
                                        onChange={(e) => onChangeTipoAtencion(e.target.value, true)}>
                                        <option>Seleccione...</option>
                                        <option value="Leve">Leve</option>
                                        <option value="Grave">Grave</option>
                                        <option value="Gravísimas">Gravísimas</option>
                                    </FormInput>
                                </div>
                                <div className="uploadSolicitud col-4 avatar-sm">
                                    <span className="avatar-title bg-primary-lighten text-primary rounded">
                                        <i className="mdi dripicons-cloud-upload" onClick={() => update('tipoAtencion', items[0]?.tipoAtencion)}></i>
                                    </span>
                                </div>
                            </Row>
                            <hr />
                            <Row className="align-items-center">
                            <div className="mb-0 col-12">
                                    {!validateError.fechaError ? (
                                        <div className="isinvalid text-100">SELECCIONE LA FECHA Y HORA HECHOS</div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <label>Fecha y Hora de los Hechos:</label>
                                <label className={classNames('editTitulos')}>
                                    <i className="mdi mdi-account-check"></i>
                                    {items[0]?.fechaIncidente}
                                </label>
                                <div className="mb-5 col-8">
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
                                        onChange={(date) => onDateChangefechaIncidente(date, true)}
                                    />
                                </div>
                                <div className="uploadSolicitud col-4 avatar-sm">
                                    <span className="avatar-title bg-primary-lighten text-primary rounded">
                                        <i className="mdi dripicons-cloud-upload" onClick={() => update('fechaIncidente', items[0]?.fechaIncidente)}></i>
                                    </span>
                                </div>

                            </Row>

                            <hr />

                        </Card.Body>
                    </Card>
                </Row>
            </VerticalForm>
        </>
    );
};

export default FormEditarSolicitud;
