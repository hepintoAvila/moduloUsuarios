/* eslint-disable no-unreachable */
// @flow
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import BootstrapTheme from '@fullcalendar/bootstrap';
import allLocales from '@fullcalendar/core/locales-all'
import {extraerMes ,extraerTextoDesdeElemento} from './funtions';

type CalendarProps = {
    onDateClick: (value: any) => void,
    onEventClick: (value: any) => void,
    onDrop: (value: any) => void,
    events: Array<any>,
    status: Boolean,
};
const handlePrevButtonClick = () => {
  const fc = document.querySelector('#fc-dom-1');
  const contenido = extraerTextoDesdeElemento(fc);
  const mes = extraerMes(`${contenido}`)
   console.log('Clic en el botón previo',mes);
   //extraerMes
};
const Calendar = ({ onDateClick, onEventClick, events,status }: CalendarProps): React$Element<React$FragmentType> => {
    const [newevents, setEvents] = useState([]);
    /*
     * handle calendar methods
     */
    const handleDateClick = (arg) => {
        onDateClick(arg);
    };
    const handleEventClick = (arg) => {
        const modifiedEvents = [...events];
        const idx = modifiedEvents.findIndex((e) => e['id'] === arg.event._def.publicId);

        if(idx===1){
            const result = events.filter((item) => item.id===arg.event._def.publicId);
            onEventClick({
                id: arg.event._def.publicId,
                idAgenda: arg.event._def.publicId,
                className:result[0]?.className,
                start:result[0]?.start,
                end:result[0]?.end,
                title:result[0]?.title.toString(),
            });
        }else{
            const result = events.filter((item) => item.id===arg.event._def.publicId);
            onEventClick({
                id: arg.event._def.publicId,
                idAgenda: arg.event._def.publicId,
                className:result[0]?.className,
                start:result[0]?.start,
                end:result[0]?.end,
                title:result[0]?.title.toString(),
            });
        }

    };


    useEffect(() => {
        (events.length > 0 && status==='404') ? setEvents(events.pop()):setEvents(events)
    }, [status,events]);


    useEffect(() => {
      const prevButton = document.querySelector('.fc-prev-button');
      prevButton.addEventListener('click', handlePrevButtonClick);
      return () => {
        prevButton.removeEventListener('click', handlePrevButtonClick);
      };
    }, []);

    useEffect(() => {
      const nextButton = document.querySelector('.fc-next-button');
       nextButton.addEventListener('click', handlePrevButtonClick);
      return () => {
        nextButton.removeEventListener('click', handlePrevButtonClick);
      }

    }, []);

    return (
        <>
            {/* full calendar control */}
            <div id="calendar">
                <FullCalendar
                    locales={allLocales} locale={'es'}
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, BootstrapTheme]}
                    handleWindowResize={true}
                    themeSystem="bootstrap"
                    buttonText={{
                        today: 'Hoy',
                        month: 'Mes',
                        week: 'Semanal',
                        day: 'Diario',
                        list: 'Lista',
                        prev: '<<',
                        next: '>>',
                    }}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                    }}
                    editable={true}
                    selectable={true}
                    droppable={true}
                    events={newevents}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                />
            </div>
        </>
    );
};

export default Calendar;
