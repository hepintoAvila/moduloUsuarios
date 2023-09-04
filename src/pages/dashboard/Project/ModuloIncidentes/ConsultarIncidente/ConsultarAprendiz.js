import React from 'react';
import {Col, Row } from 'react-bootstrap';
import CardDatosPersonales from './CardDatosPersonales';
import CarHistorialIncidencias from './CarHistorialIncidencias';
import TopbarSearch from '../../../../../components/TopbarSearch';
 
const ConsultarAprendiz = () => {
    return(
        <React.Fragment>

            <Row>
                <Col>
                    <TopbarSearch/>
                    <div><br/></div>
                    <CardDatosPersonales />
                    <CarHistorialIncidencias />
                </Col>
            </Row>

        </React.Fragment>
    )
}
export default ConsultarAprendiz;