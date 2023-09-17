// @flow
import React, { useContext, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import BootstrapTheme from '@fullcalendar/bootstrap';
import allLocales from '@fullcalendar/core/locales-all';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';




const ConsultaCalendario = () => {
    const defaultEvents = [
        {
            id: 1,
            className:'bg-info',
            start:new Date().setDate(new Date().getDate() + 2),
            end: '',
            title:'Prueba',
        }
    ];
    const [events, setEvents] = useState([...defaultEvents]);
    const {query,
        itemsQueryById,
        obtenerNumeroDesdeURL,
        setIdSolicitud,loading} = useContext(NotificacionesContext)

    useEffect(() => {
        const idSolicitud = obtenerNumeroDesdeURL(window.location.hash)
        setIdSolicitud(idSolicitud)
        query('ModuloNotificaciones','AgendarCitas',[{opcion:encodeBasicUrl('consultar'),obj:'queryByIdComite',sw:3,idSolicitud:encodeBasicUrl(idSolicitud)}]);
      }, [query]);

      useEffect(() => {
        if(!loading){
         setEvents(itemsQueryById?.data?.Agenda?itemsQueryById?.data?.Agenda:[]);
        }else{
            setEvents({
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
    return (
        <>
            {/* full calendar control */}
            <div id="calendar"  style={{ height: '300em' }}>
                <FullCalendar
                
                    locales={allLocales} locale={'es'} 
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, BootstrapTheme]}
                    handleWindowResize={false}
                    themeSystem="bootstrap"
                    buttonText={{
                        month: 'Mes',
                        prev: '<',
                        next: '>',
                    }}
                    headerToolbar={{
                        left: 'prev,next',
                        center: 'title',
                        right: 'dayGridMonth',
                    }}
                    editable={false}
                    selectable={false}
                    droppable={false}
                    events={events}
                />
            </div>
        </>
    );
};

export default ConsultaCalendario;
