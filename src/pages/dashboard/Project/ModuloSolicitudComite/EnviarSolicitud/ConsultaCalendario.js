// @flow
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import BootstrapTheme from '@fullcalendar/bootstrap';
import allLocales from '@fullcalendar/core/locales-all';
const defaultEvents = [
    {
        id: 1,
        title: 'Interview - Backend Engineer',
        start: new Date(),
        className: 'bg-success',
    },
    {
        id: 2,
        title: 'Phone Screen - Frontend Engineer',
        start: new Date().setDate(new Date().getDate() + 2),
        className: 'bg-info',
    },
    {
        id: 3,
        title: 'Meeting with John Deo',
        start: new Date().setDate(new Date().getDate() + 2),
        end: new Date().setDate(new Date().getDate() + 4),
        className: 'bg-warning',
    },
    {
        id: 4,
        title: 'Buy a Theme',
        start: new Date().setDate(new Date().getDate() + 4),
        end: new Date().setDate(new Date().getDate() + 5),
        className: 'bg-primary',
    },
];

type CalendarProps = {
    events: Array<any>,
};


const ConsultaCalendario = ({ events }: CalendarProps): React$Element<React$FragmentType> => {
 
    return (
        <>
            {/* full calendar control */}
            <div id="calendar"  style={{ height: '300em' }}>
                <FullCalendar
                
                    locales={allLocales} locale={'es'} 
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, BootstrapTheme]}
                    handleWindowResize={true}
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
                    events={defaultEvents}
                />
            </div>
        </>
    );
};

export default ConsultaCalendario;
