import React from 'react';
import {Row, Col } from 'react-bootstrap';
import FormDatosAprendiz from './FormDatosAprendiz';
import FormDatosIncidente from './FormDatosIncidente';
import FormDatosEvidencia from './FormDatosEvidencia';
 

const EnviarSolicitud = () => {
 
    return (
        <React.Fragment>
            <Row>
            <Col xl={{ span: 4, order: 1 }} lg={{ order: 2 }}>
              <FormDatosAprendiz/>
            </Col>
            <Col xl={4} lg={{ span: 6, order: 1 }}><FormDatosIncidente/></Col>
            <Col xl={4} lg={{ span: 6, order: 1 }}><FormDatosEvidencia/></Col>
        </Row>
        </React.Fragment>
    );
};
export default EnviarSolicitud;