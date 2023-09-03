
// @flow
import { Card } from 'react-bootstrap';
import classnames from 'classnames';
import React, { useState } from 'react';

 
const CardDatosIncidente = () => {
    const [evidencia] = useState({
        attachments: [
            { id: 1, name: 'Hyper-admin-design.zip', size: '2.3MB', ext: '.zip' },
            { id: 2, name: 'Dashboard-design.jpg', size: '0.3MB', ext: '.jpg' },
            { id: 3, name: 'Admin-bug-report.mp4', size: '4.1MB', ext: '.mp4' },
        ],
        profileStats:[
            { label: 'Fecha y Hora de los Hechos', value: '2023-03-31 11:35:00' },
            { label: 'Tipo de llamado', value: 'Atención Verbal' },
            { label: 'Tipo de Solicitud', value: 'ACADEMICO' },
            { label: 'Tipo de incidencia', value: 'ALTA' },
        ]
    });
    
    
    return ( <React.Fragment>
        <Card className={classnames('widget-flat')}>
            <Card.Body>
                <div>
                    <h4 className="mt-1 mb-1">DETALLES DE TIEMPO</h4>
                    <ul className="mb-0 list-inline">
                        {evidencia?.profileStats.map((stat, i) => {
                            return (
                                <li className="list-inline-item me-3" key={i + '-stat'}>
                                    <h5 className="mb-1">{stat.label}</h5>
                                    <p className="mb-0 font-13">{stat.value}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                
            </Card.Body>
        </Card>
        </React.Fragment>);
};
export default CardDatosIncidente;
