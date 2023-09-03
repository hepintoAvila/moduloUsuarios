/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';

import 'react-bootstrap-typeahead/css/Typeahead.css';

//import { DashboardContext } from '../../../../layouts/context/DashboardContext';
//import { usePermisos } from '../../../../hooks/usePermisos';
import SimpleMDEReact from 'react-simplemde-editor';
import './easymde.min.css';
const Recordatorio = () => {
  const delay = 1000;
  const options = {
      autosave: {
          enabled: true,
          uniqueId: 1
      },
  };
    //const { tipo,itemUrl } = useContext(DashboardContext)

    //const { permisos } = usePermisos(tipo);

    return (
        <React.Fragment>
            <Row>

                <Col lg={12}>
                    <Card>
                        <Card.Body>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label htmlFor="descripcion" column md={3}>
                                    Descripción del Recordatorio:
                                </Form.Label>
                                <Col md={9}>
                                <SimpleMDEReact id={2} options={options} delay={delay}/>
                                </Col>
                            </Form.Group>
                        </Card.Body>

                    </Card>
                </Col>
                
            </Row>
        </React.Fragment>
    );
};
Recordatorio.defaultProps = {
    itemsmenu: '/',
};
export default Recordatorio;
