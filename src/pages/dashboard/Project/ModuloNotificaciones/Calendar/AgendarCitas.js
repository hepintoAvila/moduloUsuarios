/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
// @flow
import React, {useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal, Form,Collapse} from 'react-bootstrap';
import '@fullcalendar/react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
// dummy data

import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';
import FormInput from '../../../components/FormInput';
import Swal from 'sweetalert2';


import { obtenerMesActual,filtrarPorMes} from './funtions';


// components

import Calendar from './Calendar';
import AddEditEvent from './AddEditEvent';
import TableAgendados from './TableAgendados';
import TableComite from './TableComite';
import TableAprendiz from './TableAprendiz';

const SidePanel = ({ miembroscomites, setIdDirectivos,setIdSolicitud,events,aprendicesAgendados,enviarEmailAprendiz}) => {

  const [isOpenFirst, setIsOpenFirst] = useState(false);
    const [isOpenSecond, setIsOpenSecond] = useState(false);
    // external events
    const externalEvents = [
        {
            id: 1,
            textClass: 'text-warning',
            className: 'bg-warning',
            title: 'ASIGNAR MIEMBROS DEL COMITE',
        },
        {
            id: 2,
            textClass: 'text-danger',
            className: 'bg-danger',
            title: 'AGENDAR APRENDICE',
        },
    ];

    const toggleFirst = () => setIsOpenFirst(!isOpenFirst);
    const toggleSecond = () => setIsOpenSecond(!isOpenSecond);

    const dataInLocalStorage = localStorage.getItem('idsIncidentes');
    const data = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : [];


    return (
        <>
            <div id="external-events" className="m-t-20">
                <br />
                <p className="text-muted"></p>
                {/* external events */}
                {externalEvents.map((event, index) => {
                    return (
                        <Link
                            to="#"
                            className="custom-accordion-title"
                            onClick={index === 0 ? toggleFirst : toggleSecond}
                            aria-controls={'collapse' + index}
                            aria-expanded={index === 0 ? isOpenFirst : isOpenSecond}>
                            <div
                                key={index}
                                className={classNames('external-event', event.className + '-lighten', event.textClass)}
                                title={event.title}>
                                <i className="mdi mdi-checkbox-blank-circle me-2 vertical-middle"></i>
                                {event.title}
                            </div>
                        </Link>
                    );
                })}
            </div>
            <Row>
                <Collapse in={isOpenFirst}>
                    <div>
                        {miembroscomites?.length > 0 ? (
                            <TableComite
                                miembros={miembroscomites}
                                setIdDirectivos={setIdDirectivos}
                                setIdSolicitud={setIdSolicitud}
                                events={events}
                                aprendicesAgendados={aprendicesAgendados}
                                enviarEmailAprendiz={enviarEmailAprendiz}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </Collapse>
            </Row>
            <Row>
                <Collapse in={isOpenSecond}>
                    <div>
                        <div>
                            {data?.length > 0 ? (
                                <TableAprendiz
                                    miembros={data}
                                    setIdDirectivos={setIdDirectivos}
                                    setIdSolicitud={setIdSolicitud}
                                    enviarEmailAprendiz={enviarEmailAprendiz}
                                />
                            ) : (
                                ''
                            )}
                            {aprendicesAgendados?.length > 0 ? (
                                <TableAgendados
                                aprendicesAgendados={aprendicesAgendados}
                                enviarEmailAprendiz={enviarEmailAprendiz}
                                />
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </Collapse>
            </Row>
        </>
    );
};

type CalendarAppState = {
    show?: boolean,
    isEditable?: boolean,
    events?: Array<any>,
    eventData?: any,
    dateInfo?:Array<any>,
    itemsAgendarCitas?:Array<any>,
};

const AgendarCitas = (state: CalendarAppState): React$Element<React$FragmentType> => {
    const { itemsQueryById, query,
        obtenerNumeroDesdeURL,
        setIdSolicitud,
        idSolicitudComite,
        setIdDirectivos,
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
        setFechaInicial, fechaInicialUptade,itemsAprendices,
        eventData, setEventData,itemsSolicitudes
    } = useContext(NotificacionesContext)

    const allApredizDatos = itemsAprendices?.data?.Aprendices || [];

    const [isEditable, setIsEditable] = useState(false);
    const [show, setShow] = useState(false);
    const [events, setEvents] = useState([]);

    const [itemsList, setItems] = useState([]);
    const [itemsUpdate, setItemsUpdate] = useState([]);
    const [dateInfo, setDateInfo] = useState({});
    const [idAgenda, setidAgenda] = useState(0);
    const [idAprendizDatos, setIdAprendizDatos] = useState(0);
    const [datosAprendizDatos, setDatosAprendizDatos] = useState(0);


    const onCloseModal = () => {
        setItems([{}])
        setShow(false);
        setEventData({});
        setDateInfo({});
        return window.location.hash='/dashboard/ModuloNotificaciones/AgendarCitas';
    };
    // on date click
    const onDateClick = (arg) => {
      const idSolicitud = obtenerNumeroDesdeURL(window.location.hash)
      const dataInLocalStorage = localStorage.getItem('comiteSelect');
      const comiteSelect = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : [];
      const idsVerdaderos = obtenerIdsVerdaderos(comiteSelect, state?.itemsAgendarCitas?.data?.Directivos);
      if((idSolicitud>0) && (idsVerdaderos?.length>0)){
         query('ModuloNotificaciones', 'AgendarCitas', [{ opcion: encodeBasicUrl('consultar'), obj: 'queryByIdComite', sw: 3, idSolicitud: encodeBasicUrl(idSolicitud) }]);
        //query('ModuloSolicitudComite','EnviarSolicitud',[{opcion:encodeBasicUrl('ConsultarSolicitud'),obj:'queryByIdAprendiz',sw:4,idAprendiz:encodeBasicUrl(idSolicitud)}]);
        query('ModuloSolicitudComite','Aprendiz',[{opcion:encodeBasicUrl('listaAprendices'),obj:'aprendices'}]);
        setDateInfo(arg?.dateStr);
        setShow(true);
        setIsEditable(false);

       }else{
        Swal.fire('Verifique los Miembros del Comite o seleccione el Aprendiz!');
       }
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
          const dataInLocalStorage = localStorage.getItem('comiteSelect');
          const comiteSelect = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : [];
          const idsVerdaderos = obtenerIdsVerdaderos(comiteSelect, state?.itemsAgendarCitas?.data?.Directivos);
          const modifiedEvents = [...events];


        const datosEvent = {
            id: modifiedEvents?.length + 1,
            fechaCita: `${data?.fechaCita} ${data?.horaCita}`,
            horaCita: data?.horaCita,
            codigoFicha: data?.codigoFicha,
            tiempoEstipulado: data?.tiempoEstipulado,
            start: `${data?.fechaCita} ${data?.horaCita}`,
            end: `${data?.fechaCita} 00:00`,
            title: data?.horaCita,
           // hechos: data?.hechos,
           // reglas: data?.reglas,
            idSolicitudComite: data?.idSolicitudComite,
            idComites: `${idsVerdaderos}`,
            accion: 'ModuloNotificaciones',
            opcion: 'AgendarCitas',
            tipo: 'addCitas',
            className: 'bg-warning',
        }

        const dataInLocalStorage1 = localStorage.getItem('idsIncidentes');
        const comiteSelect1 = dataInLocalStorage ? JSON.parse(dataInLocalStorage1) : [];

        const filteredAgendada = comiteSelect1?.filter((row) => {
          return row?.id !== datosEvent?.idSolicitudComite;
          });
          localStorage.removeItem('idsIncidentes')
          localStorage.setItem('idsIncidentes', JSON.stringify(filteredAgendada));
        setTimeout(function () {
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
                accion: 'ModuloNotificaciones',
                opcion: 'AgendarCitas',
                tipo: 'updateCitas',
            }
            setTimeout(function () {
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
            getData(queryDatos)
        }, 2000);
        setEvents(modifiedEvents);
        toggle();
    };

    useEffect(() => {

        if (!loading) {
            setItems(itemsQueryById?.data?.Solicitudes ? itemsQueryById?.data?.Solicitudes : [])
            setEvents(state?.itemsAgendarCitas?.data?.Agenda ? state?.itemsAgendarCitas?.data?.Agenda : []);
        } else {
            setItems({
                id: 1,
                idSolicitudComite: 0,
                codigoFicha:'',
                //hechos: 'SIN REGISTROS',
                tiempoEstipulado: '',
                //reglas: '',
                fechaHoraCita: '',
                className: '',
                start: '',
                end: '',
                title: '',
                idComites: '',
            })
        }
    }, [itemsQueryById, loading, state?.itemsAgendarCitas]);

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

useEffect(() => {
  query('ModuloSolicitudComite', 'EnviarSolicitud', [{ opcion: encodeBasicUrl('ConsultarSolicitud'), obj: 'ConsultarSolicitud', sw: '1' }]);
}, [query])

// Ejemplo de uso
const mesActual = obtenerMesActual();
const incidentesGuardados = filtrarPorMes(events, Number(mesActual));

const aprendicesAgendados = itemsSolicitudes?.data?.Solicitudes?.filter(item => incidentesGuardados?.includes(parseInt(item.id)))
  .map(item => ({
    "id": Number(item.id),
    "name": item.aprendiz,
    "email": item.email,
  }));

  const enviarEmailAprendiz = (id) => {

    const filteredEmailAprediz = aprendicesAgendados?.filter((row) => {
      return Number(row?.id)===Number(id)
    });
    const email =filteredEmailAprediz[0]?.email
    Swal.fire({
      title: `Notificar a: ${email}`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Enviar email",
      showLoaderOnConfirm: true,
      preConfirm: async (emailEntrada) => {
        try {

        const datosEvent = {
            emailEntrada: `${emailEntrada}`,
            emailAprendiz: `${email}`,
            idSolicitud: `${id}`,
            accion: 'ModuloNotificaciones',
            opcion: 'AgendarCitas',
            tipo: 'enviarEmailAprendiz',
        }
        setTimeout(function () {
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
            getData(queryDatos)
        }, 2000);
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Solicitud Enviada',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });

  };
  useEffect(() => {
    if(Number(idAprendizDatos)>0){
      const filteredAprediz = allApredizDatos?.filter((row) => {
              return Number(row?.userDetails?.id)===Number(idAprendizDatos)
        });
        setDatosAprendizDatos(filteredAprediz)
    }

}, [idAprendizDatos]);

///console.log('itemsList',itemsList)
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
                                        miembroscomites={state?.itemsAgendarCitas?.data?.Directivos}
                                        setIdDirectivos={setIdDirectivos}
                                        setIdSolicitud={setIdSolicitud}
                                        events={events}
                                        aprendicesAgendados={aprendicesAgendados}
                                        enviarEmailAprendiz={enviarEmailAprendiz}
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
                datosAprendizDatos={datosAprendizDatos}
                setIdAprendizDatos={setIdAprendizDatos}
                idAprendizDatos={idAprendizDatos}
                />
            ) : null}

            {modal? (<>
                <Modal show={modal} onHide={toggle}  size="sm-down" >
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
                                            onChange={(e) => onTiempoEstipulado(e.target.value,fechaInicialUptade ? fechaInicialUptade:'0000-00-00 00:00')}
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
