// @flow
import React, {useCallback, useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Button, Table, Modal, Form } from 'react-bootstrap';
import '@fullcalendar/react';
import classNames from 'classnames';
// components

import Calendar from './Calendar';
import AddEditEvent from './AddEditEvent';

// dummy data

import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';
import FormInput from '../../../components/FormInput';
import Swal from 'sweetalert2';
//const loadings = (loading) => {loading? <div className=""></div>:''};

const TableComite = ({ miembros, setIdDirectivos }) => {

    const [checkedState, setCheckedState] = useState(
        new Array(miembros.length).fill(false)
    );
    const handleOnChange = useCallback((position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }, [checkedState]);

    setIdDirectivos(checkedState);
    return (
        <Card>
            <Card.Body>
                <Table className="mb-0 tableComite" responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Miembros del Comité</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {miembros?.map(({ correo, nombresApellidos, id }, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{id}</th>
                                    <td>{nombresApellidos}<br />{correo}</td>
                                    <td>
                                        <input type="checkbox"
                                            id={`custom-checkbox-${index}`}
                                            name={nombresApellidos}
                                            value={nombresApellidos}
                                            checked={checkedState[index]}
                                            onChange={() => handleOnChange(index)}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};
const SidePanel = ({ miembroscomites, setIdDirectivos }) => {

    // external events
    const externalEvents = [
        {
            id: 2,
            textClass: 'text-warning',
            className: 'bg-warning',
            title: 'ACADEMICA',
        },
        {
            id: 3,
            textClass: 'text-danger',
            className: 'bg-danger',
            title: 'DISCIPLINARIA',
        },
    ];

    return (
        <>
            <div id="external-events" className="m-t-20">
                <br />
                <p className="text-muted"></p>
                {/* external events */}
                {externalEvents.map((event, index) => {
                    return (
                        <div
                            key={index}
                            className={classNames('external-event', event.className + '-lighten', event.textClass)}
                            title={event.title}
                            data={event.className}>
                            <i className="mdi mdi-checkbox-blank-circle me-2 vertical-middle"></i>
                            {event.title}
                        </div>
                    );
                })}
            </div>
            {miembroscomites?.length > 0 ? <TableComite
                miembros={miembroscomites}
                setIdDirectivos={setIdDirectivos}
            /> : ''}


        </>
    );
};

type CalendarAppState = {
    show?: boolean,
    isEditable?: boolean,
    events?: Array<any>,
    eventData?: any,
    dateInfo?:Array<any>,
};

const AgendarCitas = (state: CalendarAppState): React$Element<React$FragmentType> => {
    const { itemsQueryById, query,
        obtenerNumeroDesdeURL,
        setIdSolicitud,
        idSolicitudComite,
        idDirectivos, setIdDirectivos,
        obtenerIdsVerdaderos,
        getData,
        status,
        calcularFechaFinal,
        calcularFechaInicial,
        loading,
        onEventClick,
        setModal, modal,
        dateInfoUpdate,
        setFechaFiinal,
        fechaFinal,
        setFechaInicial, fechaInicialUptade,
        eventData, setEventData,
    } = useContext(NotificacionesContext)



    const [isEditable, setIsEditable] = useState(false);
    const [show, setShow] = useState(false);
    const [events, setEvents] = useState([]);

    const [itemsList, setItems] = useState([]);
    const [itemsUpdate, setItemsUpdate] = useState([]);
    const [dateInfo, setDateInfo] = useState({});
    const [idAgenda, setidAgenda] = useState(0);

    
    useEffect(() => {
        const idSolicitud = obtenerNumeroDesdeURL(window.location.hash)
        setIdSolicitud(idSolicitud)
        query('ModuloNotificaciones', 'AgendarCitas', [{ opcion: encodeBasicUrl('consultar'), obj: 'queryByIdComite', sw: 3, idSolicitud: encodeBasicUrl(idSolicitud) }]);
    }, [query]);

    const onCloseModal = () => {
        setShow(false);
        setEventData({});
        setDateInfo({});
    };
    // on date click
    const onDateClick = (arg) => {
       setDateInfo(arg?.dateStr);
        setShow(true);
        setIsEditable(false);

    };



    /*
    on add event 
    */
    const onAddEvent = (data) => {
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Solicitud Enviada',
            showConfirmButton: false,
            timer: 1500
          }) 
        const idsVerdaderos = obtenerIdsVerdaderos(idDirectivos, itemsQueryById?.data?.Directivos);
        const modifiedEvents = [...events];
        const datos = data[0];

        const datosEvent = {
            id: modifiedEvents.length + 1,
            fechaCita: `${datos.fechaCita} ${datos.horaCita}`,
            horaCita: datos.horaCita,
            tiempoEstipulado: datos.tiempoEstipulado,
            start: `${datos.fechaCita} ${datos.horaCita}`,
            end: `${datos.fechaCita} 00:00`,
            title: datos.horaCita,
            observaciones: datos.observaciones,
            idSolicitudComite: datos.idSolicitudComite,
            idComites: `${idsVerdaderos}`,
            accion: 'ModuloNotificaciones',
            opcion: 'AgendarCitas',
            tipo: 'addCitas',
            className: 'bg-warning',
        }
        setTimeout(function () {
            const queryDatos = datosEvent
                ? Object.keys(datosEvent)
                    .map((key) => key + '=' + btoa(datosEvent[key]))
                    .join('&')
                : '';
            getData(queryDatos)
        }, 2000);

        modifiedEvents.push(datosEvent);
        setEvents(modifiedEvents);
        onCloseModal();


    };

    /*
    on update event
    */
    const onUpdateEvent = (idAgenda) => {
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Solicitud Enviada',
            showConfirmButton: false,
            timer: 1500
          }) 
            const datosEvent = {
                idAgenda: `${idAgenda}`,
                fechaCita: `${itemsUpdate[0]?.horaCita}`,
                tiempoEstipulado: `${itemsUpdate[0]?.tiempoEstipulado}`,
                observaciones: `${itemsUpdate[0]?.observaciones}`,
                accion: 'ModuloNotificaciones',
                opcion: 'AgendarCitas',
                tipo: 'updateCitas',
            }
            setTimeout(function () {
                const queryDatos = datosEvent
                    ? Object.keys(datosEvent)
                        .map((key) => key + '=' + btoa(datosEvent[key]))
                        .join('&')
                    : '';
                getData(queryDatos)
            }, 2000); 
    
            const modifiedEvents = [...events];
            const idx = modifiedEvents.findIndex((e) => e['id'] === itemsUpdate[0]?.idAgenda);
            modifiedEvents[idx]['title'] = itemsUpdate[0]?.horaCita;
            setEvents(modifiedEvents);
            toggle(); 


    };
 
    const onEliminarEvent = (idAgenda) => {
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Solicitud Enviada',
            showConfirmButton: false,
            timer: 1500
          }) 
        var modifiedEvents = [...events];
        const idx = modifiedEvents.findIndex((e) => e['id'] ===  idAgenda);
        modifiedEvents.splice(idx, 1);
        const datosEvent = {
            idAgenda: `${idAgenda}`,
            accion: 'ModuloNotificaciones',
            opcion: 'AgendarCitas',
            tipo: 'deleteCitas',
        }
        setTimeout(function () {
            const queryDatos = datosEvent
                ? Object.keys(datosEvent)
                    .map((key) => key + '=' + btoa(datosEvent[key]))
                    .join('&')
                : '';
            getData(queryDatos)
        }, 2000);         
        setEvents(modifiedEvents);
        toggle();
    };



    useEffect(() => {
        if (!loading) {
            setItems(itemsQueryById?.data?.Solicitudes[0])
            setEvents(itemsQueryById?.data?.Agenda ? itemsQueryById?.data?.Agenda : []);
        } else {
            setItems({
                id: 1,
                idSolicitudComite: 0,
                observaciones: 'SIN REGISTROS',
                tiempoEstipulado: '',
                fechaHoraCita: '',
                className: '',
                start: '',
                end: '',
                title: '',
                idComites: '',
            })
        }
    }, [itemsQueryById, loading]);
    /*
    
        */
    const toggle = () => {
        setModal(!modal);
    };
 
const onTiempoEstipulado = (value,var2) => {
  
        if (value) {
        const resp = calcularFechaFinal(var2,value)
        setFechaFiinal(resp);
        setItemsUpdate([{
            ...itemsUpdate[0],
            tiempoEstipulado: value,
            idAgenda:idAgenda
        }])
    }
};
const onTiempoInicial = (value,fechaFinal) => {
 
    if (value) {
        const resp = calcularFechaInicial(fechaFinal,value)
        setFechaInicial(resp);
        setItemsUpdate([{
            ...itemsUpdate[0],
            horaCita: value,
            idAgenda:idAgenda
            
        }])
    }
};
useEffect(() => {
    setidAgenda(dateInfoUpdate.idAgenda)
}, [dateInfoUpdate]);    


// console.log('loading',loading);
   return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                            <Col lg={8}>
                                    {/* fullcalendar control */}
                           
                                    <Calendar
                                        onDateClick={onDateClick}
                                        onEventClick={onEventClick}
                                        events={events}
                                        status={status}

                                    />
 
                                </Col>
                                <Col lg={4}>
                                    <div className="d-grid">
                                    </div>
                                    <SidePanel
                                        miembroscomites={itemsQueryById?.data?.Directivos}
                                        setIdDirectivos={setIdDirectivos}
                                    />

                                </Col>

                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* add new event modal */}
            {show ? (
                <AddEditEvent
                    idSolicitud={idSolicitudComite}
                    isOpen={show}
                    onClose={onCloseModal}
                    isEditable={isEditable}
                    setIsEditable={setIsEditable}
                    eventData={eventData}
                    onAddEvent={onAddEvent}
                    itemsQueryById={itemsList}
                    dateInfo={dateInfo}
                    status={status}
                />
            ) : null}
 
            {modal? (<>
                <Modal show={modal} onHide={toggle}  size="sm-down">
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">CONFIGURACIÓN DE LA REUNIÓN</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form  className="formModal">
                            <Row>
                            <ul className="list-unstyled">
                                        <li className="mb-2">
                                            <p className="text-muted mb-1 font-13">
                                                <label className="mb-2"> Fecha y Hora Registradas: {dateInfoUpdate.start}</label>
                                            </p>
                                        </li>
                                    </ul>
                                <Col sm={6}>
    
                                    <Form.Group className="mb-3" controlId="horaCita">
                                    <label className="mb-2"><i className="mdi mdi-calendar-range font-13"></i> Fecha y Hora de la Cita</label> <br />
                                    <label className="mb-2">{fechaInicialUptade?fechaInicialUptade:'0000-00-00 00:00'}</label>
                                    <FormInput
                                        type="time"
                                        name="horaCita"
                                        containerClass={'mb-3'}
                                        key="horaCita"
                                        value={itemsUpdate[0]?.horaCita}
                                        onChange={(e) => onTiempoInicial(e.target.value,dateInfoUpdate.start)}
                                    />
                                    </Form.Group>
                                </Col>
                                <Col sm={6}>
                                    <Form.Group className="mb-3" controlId="tiempoEstipulado">
                                        <label className="mb-2"><i className="mdi mdi-calendar-range font-13"></i> Tiempo estipulado</label>
 
                                        <FormInput
                                            type="select"
                                            label={fechaFinal?fechaFinal:dateInfoUpdate.end}
                                            name="tiempoEstipulado"
                                            className="form-control"
                                            containerClass={'mb-3'}
                                            onChange={(e) => onTiempoEstipulado(e.target.value,fechaInicialUptade?fechaInicialUptade:'0000-00-00 00:00')}
                                        >
                                            <option value="">Asignar la Hora Final</option>
                                            <option value="15">15 minutos</option>
                                            <option value="30">30 minutos</option>
                                            <option value="45">45 minutos</option>
                                            <option value="60">1 Hora</option>
                                            <option value="120">2 Horas</option>
                                            <option value="180">3 Horas</option>
                                        </FormInput>
                                    </Form.Group>
                                </Col>
                                </Row>
                                <Row>    
                                <Col md={12}>
                                    <Form.Group className="mb-3" controlId="observaciones">
                                        <label className="mb-2"><i className="mdi mdi-calendar-range font-13"></i> Observaciones</label>
                                        <Form.Control
                                            label="Observaciones"
                                            type="textarea"
                                            name="observaciones"
                                            rows="5"
                                            containerClass={'mb-3'}
                                            key="observaciones"
                                            value={itemsUpdate[0]?.observaciones}
                                            onChange={(e) => setItemsUpdate([{ ...itemsUpdate[0], observaciones: e.target.value,idAgenda:idAgenda}])}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Modal.Footer>
                        <Row>
                            <Col xs={4}>
                                {modal ? (
                                    <Button variant="danger" onClick={() => onEliminarEvent(idAgenda)}>
                                        Eliminar
                                    </Button>
                                ) : null}
                            </Col>
                            <Col xs={8} className="text-end">
                                <Button className="btn btn-light me-1" onClick={toggle}>
                                    Cerrar
                                </Button>
                                <Button variant="success" type="submit" className="btn btn-success" onClick={() => onUpdateEvent(idAgenda)}>
                                    Actualizar
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                        </form>
                    </Modal.Body>

                </Modal>
            </>) : ''}

        </>
    );
};

export default AgendarCitas;
