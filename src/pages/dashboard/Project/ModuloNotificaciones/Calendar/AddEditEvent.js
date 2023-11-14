/* eslint-disable no-undef */
// @flow
import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button, Form, Card, Nav, Tab } from 'react-bootstrap';
import FormInput from '../../../components/FormInput';
import classNames from 'classnames';
import DatosAprendiz from './DatosAprendiz';

type AddEditEventProps = {
    isOpen?: boolean,
    onClose?: () => void,
    isEditable?: boolean,
    eventData?: any,
    idSolicitud?: Number,
    onRemoveEvent?: () => void,
    onUpdateEvent: (value: any) => void,
    onAddEvent: (value: any) => void,
    itemsQueryById: Array<any>,
};

const AddEditEvent = ({
    isOpen,
    onClose,
    isEditable,
    idSolicitud,
    itemsQueryById,
    onRemoveEvent,
    onUpdateEvent,
    onAddEvent,
    dateInfo,
}: AddEditEventProps): React$Element<any> => {
    // event state
    const [validateError, setError] = useState({
        horaCitaError: true,
        horaCitaMenssageError: { message: 'Este campo es requerido' },
        tiempoEstipuladoError: true,
        tiempoEstipuladoMenssageError: { message: 'Este campo es requerido' },
    });
    //const [fechaSelect, setFechaSelect] = useState('');
    const [selectTexto, setFechaSelectTexto] = useState('');

    const [items, setItems] = useState([
        {
            idSolicitudComite: idSolicitud,
            observaciones: '',
            fechaCita: dateInfo,
            horaCita: '',
            tiempoEstipulado: '',
            className: 'bg-warning',
            title: itemsQueryById?.codigoFicha,
            start: '',
            end: '',
        },
    ]);
    const handleRegistration = () => {
        isEditable ? onUpdateEvent({ ...items }) : onAddEvent({ ...items });
    };
    const onChangeFechaHora = (value, selectTexto) => {
        setItems([{ ...items[0], horaCita: value, fechaCita: selectTexto }]);
        setError({
            ...validateError,
            horaCitaError: items[0]?.horaCita.length > 0 ? false : true,
            horaCitaMenssageError: { message: '' },
        });
    };
    const onTiempoEstipulado = (value) => {
        if (value) {
            setItems([
                {
                    ...items[0],
                    tiempoEstipulado: value,
                    fechaCita: dateInfo,
                    title: '',
                    end: '',
                },
            ]);
            setError({
                ...validateError,
                tiempoEstipuladoError: items[0]?.tiempoEstipulado.length > 0 ? false : true,
                tiempoEstipuladoMenssageError: { message: '' },
            });
        }
    };

    useEffect(() => {
        // const fecha= new Date(items[0]?.fechaCita?.date?.toString());
        //const fechaEnEspanol = obtenerFechaEnEspanol(fecha);
        setFechaSelectTexto(dateInfo);
        //setFechaSelect(items[0]?.fechaCita?.date?.toString())
    }, [dateInfo]);

    return (
        <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false}>
            <Modal.Header className="pb-2 px-4 border-bottom-0" closeButton>
                <Modal.Title id="modal-title">
                    <h5> {isEditable ? 'Edit Cita' : 'Nueva Cita'} </h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 pb-4 pt-0">
                <Row>
                    <Col md={6}>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <p className="text-muted mb-1 font-13">
                                    <h5>CÓDIGO:</h5>
                                    {itemsQueryById?.codigoFicha}
                                </p>
                            </li>
                            <li className="mb-2">
                                <p className="text-muted mb-1 font-13">
                                    <h5>Instructor:</h5>
                                    {itemsQueryById?.instructor}
                                </p>
                            </li>
                            <li className="mb-2">
                                <p className="text-muted mb-1 font-13">
                                    <h5>Aprendiz:</h5>
                                </p>
                            </li>
                        </ul>
                    </Col>

                    <Col md={6}>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <p className="text-muted mb-1 font-13">
                                    <h5>Fecha del Incidente:</h5>
                                    {itemsQueryById?.fechaHora}
                                </p>
                            </li>
                            <li className="mb-2">
                                <p className="text-muted mb-1 font-13">
                                    <h5>Fecha Sugerida para la Cita:</h5>
                                    {itemsQueryById?.fechaHoraAgendada}
                                </p>
                            </li>
                            <li className="mb-2">
                                <p className="text-muted mb-1 font-13">{itemsQueryById?.aprendiz}</p>
                            </li>
                        </ul>
                    </Col>
                </Row>

                <Tab.Container defaultActiveKey="1">
                    <Row>
                        <Col>
                            <span className="d-none d-lg-block">DESCRIPCÓN Y EVIDENCIAS</span>
                            <Card>
                                <Card.Body>
                                    <Nav
                                        as="ul"
                                        variant="pills"
                                        className="nav nav-pills bg-nav-pills nav-justified mb-3">
                                        <Nav.Item as="li" className="nav-item">
                                            <Nav.Link href="#" eventKey="1" className="nav-link rounded-0">
                                                <i
                                                    className={classNames(
                                                        'mdi mdi-book-account-outline',
                                                        'font-18'
                                                    )}></i>
                                                <span className="d-none d-lg-block">FORMULARIO DE LA AGENDA</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" className="nav-item">
                                            <Nav.Link href="#" eventKey="2" className="nav-link rounded-0">
                                                <i
                                                    className={classNames(
                                                        'mdi mdi-book-open-page-variant',
                                                        'font-18'
                                                    )}></i>
                                                <span className="d-none d-lg-block">DATOS DEL INCIDENTE</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Row>
                                        <Col lg={12}>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="1">
                                                    <form onSubmit={handleRegistration} className="formModal">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <ul className="list-unstyled">
                                                                    <li className="mb-2">
                                                                        <p className="text-muted mb-1 font-13">
                                                                            <h5>DATOS DE LA REUNIÓN</h5>
                                                                        </p>
                                                                    </li>
                                                                </ul>
                                                                <label className="mb-2">
                                                                    <i className="mdi mdi-calendar-range font-13"></i>{' '}
                                                                    Fecha y Hora de la Cita
                                                                </label>{' '}
                                                                <br />
                                                                <label className="mb-2">{selectTexto}</label>
                                                                <FormInput
                                                                    label="Time"
                                                                    type="time"
                                                                    name="horaCita"
                                                                    containerClass={'mb-3'}
                                                                    key="horaCita"
                                                                    value={items[0]?.horaCita}
                                                                    onChange={(e) =>
                                                                        onChangeFechaHora(e.target.value, selectTexto)
                                                                    }
                                                                />
                                                                <small className="text-danger">
                                                                    {validateError?.horaCitaError &&
                                                                        validateError.horaCitaMenssageError.message}
                                                                </small>
                                                            </Col>
                                                            <Col sm={12}>
                                                                <Form.Group
                                                                    className="mb-3"
                                                                    controlId="tiempoEstipulado">
                                                                    <label className="mb-2">
                                                                        <i className="mdi mdi-calendar-range font-13"></i>{' '}
                                                                        Tiempo estipulado de la reunión
                                                                    </label>
                                                                    <FormInput
                                                                        type="select"
                                                                        name="tiempoEstipulado"
                                                                        className="form-control"
                                                                        containerClass={'mb-3'}
                                                                        onChange={(e) =>
                                                                            onTiempoEstipulado(e.target.value)
                                                                        }>
                                                                        <option value="">Asignar la Hora Final</option>
                                                                        <option value="15">15 minutos</option>
                                                                        <option value="30">30 minutos</option>
                                                                        <option value="45">45 minutos</option>
                                                                        <option value="60">1 Hora</option>
                                                                        <option value="120">2 Horas</option>
                                                                        <option value="180">3 Horas</option>
                                                                    </FormInput>
                                                                    <small className="text-danger">
                                                                        {validateError?.tiempoEstipuladoError &&
                                                                            validateError.tiempoEstipuladoMenssageError
                                                                                .message}
                                                                    </small>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={12}>
                                                                <Form.Group className="mb-3" controlId="hechos">
                                                                    <label className="mb-2">
                                                                        <i className="mdi mdi-calendar-range font-13"></i>{' '}
                                                                        Hechos
                                                                    </label>
                                                                    <FormInput
                                                                        type="textarea"
                                                                        name="hechos"
                                                                        rows="5"
                                                                        cols="4"
                                                                        containerClass={'mb-3'}
                                                                        key="hechos"
                                                                        value={items[0]?.hechos}
                                                                        onChange={(e) =>
                                                                            setItems([
                                                                                { ...items[0], hechos: e.target.value },
                                                                            ])
                                                                        }
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={12}>
                                                                <Form.Group className="mb-3" controlId="reglas">
                                                                    <label className="mb-2">
                                                                        <i className="mdi mdi-calendar-range font-13"></i>{' '}
                                                                        Reglas
                                                                    </label>
                                                                    <FormInput
                                                                        type="textarea"
                                                                        name="reglas"
                                                                        rows="5"
                                                                        containerClass={'mb-3'}
                                                                        key="reglas"
                                                                        value={items[0]?.reglas}
                                                                        onChange={(e) =>
                                                                            setItems([
                                                                                { ...items[0], reglas: e.target.value },
                                                                            ])
                                                                        }
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col xs={4}>
                                                                {isEditable ? (
                                                                    <Button variant="danger" onClick={onRemoveEvent}>
                                                                        Eliminar
                                                                    </Button>
                                                                ) : null}
                                                            </Col>
                                                            <Col xs={8} className="text-end">
                                                                <Button
                                                                    className="btn btn-light me-1"
                                                                    onClick={onClose}>
                                                                    Cerrar
                                                                </Button>
                                                                <Button
                                                                    variant="success"
                                                                    type="submit"
                                                                    className="btn btn-success">
                                                                    Enviar
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </form>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="2">
                                                    <h4 className="header-title">Descripción de los Hechos</h4>
                                                    <DatosAprendiz/>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Tab.Container>
            </Modal.Body>
        </Modal>
    );
};

export default AddEditEvent;
