// @flow
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Button,Table} from 'react-bootstrap';
import '@fullcalendar/react';
 import classNames from 'classnames';
// components
 
import Calendar from './Calendar';
import AddEditEvent from './AddEditEvent';

// dummy data
 
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';

const TableComite = ({miembros,setIdDirectivos}) => {
 
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
                            <th>Nombres  Apellidos</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {miembros?.map(({ correo, nombresApellidos,id }, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{id}</th>
                                    <td>{nombresApellidos}<br/>{correo}</td>
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
const SidePanel = ({miembroscomites,setIdDirectivos}) => {
 
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
              {miembroscomites?.length>0 ? <TableComite 
              miembros={miembroscomites}
              setIdDirectivos={setIdDirectivos}
              />:''}  
              
          
        </>
    );
};

type CalendarAppState = {
    show?: boolean,
    isEditable?: boolean,
    events?: Array<any>,
    eventData?: any,
    dateInfo?: any,
};

const AgendarCitas = (state: CalendarAppState): React$Element<React$FragmentType> => {
    const defaultEvents = [
        {
            id: 1,
            className:'bg-info',
            start:new Date().setDate(new Date().getDate() + 2),
            end: '',
            title:'Prueba',
        }
    ];
    const {itemsQueryById,query,
        obtenerNumeroDesdeURL,
        setIdSolicitud,
        idSolicitudComite,
        idDirectivos, setIdDirectivos,
        obtenerIdsVerdaderos,
        getData,
        status,
        loading} = useContext(NotificacionesContext)

    

    const [isEditable, setIsEditable] = useState(false);
    const [show, setShow] = useState(false);
    const [events, setEvents] = useState([...defaultEvents]);
    const [eventData, setEventData] = useState({});
    const [itemsList, setItems] = useState([]); 
    const [dateInfo, setDateInfo] = useState({});
  
 
    useEffect(() => {
        const idSolicitud = obtenerNumeroDesdeURL(window.location.hash)
        setIdSolicitud(idSolicitud)
        query('ModuloNotificaciones','AgendarCitas',[{opcion:encodeBasicUrl('consultar'),obj:'queryByIdComite',sw:3,idSolicitud:encodeBasicUrl(idSolicitud)}]);
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

    // on event click
    const onEventClick = (arg) => {
        const event = {
            id: parseInt(arg.event.id),
            idSolicitudComite: parseInt(arg.event.idSolicitudComite),
            observaciones: arg.event.Observaciones,
            tiempoEstipulado: arg.event.tiempoEstipulado,
            fechaHoraCita: arg.event.fechaHoraCita,
            className: arg.event.className,
            start:arg.event.fechaHoraCita,
            start:arg.event.fechaHoraCita,
            end: arg.event.fechaFinal,
            idComites:arg.event.idComites,
            title:`hola mundo` 
        };
        setEventData(event);
        setShow(true);
        setIsEditable(true);
    };

    /*
    on add event 
    */
    const onAddEvent = (data) => {
 
                    const idsVerdaderos = obtenerIdsVerdaderos(idDirectivos,itemsQueryById?.data?.Directivos);
                    const modifiedEvents = [...events];
                    const datos = data[0];
                    
                    const datosEvent ={
                        id: modifiedEvents.length + 1,
                        fechaCita:`${datos.fechaCita} ${datos.horaCita}`,
                        horaCita:datos.horaCita,
                        tiempoEstipulado:datos.tiempoEstipulado,
                        start:`${datos.fechaCita} ${datos.horaCita}`,
                        end:`${datos.fechaCita} 00:00`,
                        title:datos.horaCita,
                        observaciones:datos.observaciones,
                        idSolicitudComite:datos.idSolicitudComite,
                        idComites:`${idsVerdaderos}`,
                        accion:'ModuloNotificaciones',
                        opcion:'AgendarCitas',
                        tipo:'addCitas',
                        className:'bg-warning',
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
    const onUpdateEvent = (data) => {
        const modifiedEvents = [...events];
        const idx = modifiedEvents.findIndex((e) => e['id'] === eventData.id);
        modifiedEvents[idx]['title'] = data.title;
        modifiedEvents[idx]['className'] = data.className;
        setEvents(modifiedEvents);
        onCloseModal();
    };

    /*
    on remove event
    */
    const onRemoveEvent = () => {
        var modifiedEvents = [...events];
        const idx = modifiedEvents.findIndex((e) => e['id'] === eventData.id);
        modifiedEvents.splice(idx, 1);
       
        setEvents(modifiedEvents);
        onCloseModal();
    };

    useEffect(() => {
        if(!loading){
         setItems(itemsQueryById?.data?.Solicitudes[0])
        
         setEvents(itemsQueryById?.data?.Agenda?itemsQueryById?.data?.Agenda:[]);
        }else{
            setItems({
                id: 1,
                idSolicitudComite: 0,
                observaciones: 'SIN REGISTROS',
                tiempoEstipulado: '',
                fechaHoraCita:'',
                className: '',
                start:'',
                start:'',
                end: '',
                title:'',
                idComites:'',
            })
        }
     }, [itemsQueryById,loading]);
/*

    */ 
  

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col lg={4}>
                                    <div className="d-grid">
                                        {/* add events */}
                                        <Button
                                            className="btn btn-lg font-16 btn-danger"
                                            id="btn-new-event"
                                            onClick={onDateClick}>
                                            <i className="mdi mdi-plus-circle-outline"></i>Crear un Miembro del Comité
                                        </Button>
                                    </div>
                                   <SidePanel 
                                   miembroscomites={itemsQueryById?.data?.Directivos} 
                                   setIdDirectivos={setIdDirectivos}
                                   />

                                </Col>
                                <Col lg={8}>
                                    {/* fullcalendar control */}
                                    <Calendar
                                        onDateClick={onDateClick}
                                        onEventClick={onEventClick}
                                        events={events}
                                        status={status}
                                        
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
                    onUpdateEvent={onUpdateEvent}
                    onRemoveEvent={onRemoveEvent}
                    onAddEvent={onAddEvent}
                    itemsQueryById={itemsList}
                    dateInfo={dateInfo}                    
                    status={status}                   
                />
            ) : null}
        </>
    );
};

export default AgendarCitas;
