// @flow
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import '@fullcalendar/react';
import { Draggable } from '@fullcalendar/interaction';
import classNames from 'classnames';

// components
 
import Calendar from './Calendar';
import AddEditEvent from './AddEditEvent';

// dummy data
import { defaultEvents } from './data';

const SidePanel = () => {
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
    /*
     * modal handeling
     */
    const [show, setShow] = useState(false);
    const onCloseModal = () => {
        setShow(false);
        setEventData({});
        setDateInfo({});
    };
    const onOpenModal = () => setShow(true);
    const [isEditable, setIsEditable] = useState(false);

    /*
     * event data
     */
    
    const [events, setEvents] = useState([...defaultEvents]);
    const [eventData, setEventData] = useState({});
    const [dateInfo, setDateInfo] = useState({});

    useEffect(() => {
        // create dragable events
        let draggableEl = document.getElementById('external-events');
        new Draggable(draggableEl, {
            itemSelector: '.external-event',
        });
    }, []);

    /*
    calendar events
    */
    // on date click
    const onDateClick = (arg) => {
        setDateInfo(arg);
        onOpenModal();
        setIsEditable(false);
    };

    // on event click
    const onEventClick = (arg) => {
        const event = {
            id: parseInt(arg.event.id),
            title: arg.event.title,
            start: arg.event.start,
            className: arg.event.classNames[0],
        };
        setEventData(event);
        onOpenModal();
        setIsEditable(true);
    };

    // on drop
    const onDrop = (arg) => {
        const dropEventData = arg;
        const title = dropEventData.draggedEl.title;
        if (title == null) {
        } else {
            let newEvent = {
                id: events.length + 1,
                title: title,
                start: dropEventData ? dropEventData.dateStr : new Date(),
                className: dropEventData.draggedEl.attributes.data.value,
            };
            const modifiedEvents = [...events];
            modifiedEvents.push(newEvent);

            setEvents(modifiedEvents);
        }
    };

    /*
    on add event 
    */
    const onAddEvent = (data) => {
        const modifiedEvents = [...events];
        const event = {
            id: modifiedEvents.length + 1,
            title: data.title,
            start: dateInfo ? dateInfo.date : new Date(),
            className: data.className,
        };
        modifiedEvents.push(event);
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

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col lg={3}>
                                    <div className="d-grid">
                                        {/* add events */}
                                        <Button
                                            className="btn btn-lg font-16 btn-danger"
                                            id="btn-new-event"
                                            onClick={onOpenModal}>
                                            <i className="mdi mdi-plus-circle-outline"></i>Crear una Cita
                                        </Button>
                                    </div>

                                    <SidePanel />
                                </Col>
                                <Col lg={9}>
                                    {/* fullcalendar control */}
                                    <Calendar
                                        onDateClick={onDateClick}
                                        onEventClick={onEventClick}
                                        onDrop={onDrop}
                                        events={events}
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
                    isOpen={show}
                    onClose={onCloseModal}
                    isEditable={isEditable}
                    eventData={eventData}
                    onUpdateEvent={onUpdateEvent}
                    onRemoveEvent={onRemoveEvent}
                    onAddEvent={onAddEvent}
                />
            ) : null}
        </>
    );
};

export default AgendarCitas;
