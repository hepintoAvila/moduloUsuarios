/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext, useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import FormInput from '../../../components/FormInput';
//import { DashboardContext } from '../../../../layouts/context/DashboardContext';
//import { usePermisos } from '../../../../hooks/usePermisos';
import SimpleMDEReact from 'react-simplemde-editor';
import './easymde.min.css';
const DecisionComite = () => {
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
                                    Descripción :
                                </Form.Label>
                                <Col md={9}>
                                <SimpleMDEReact id={1} options={options} />
                                </Col>
                            </Form.Group>
                        </Card.Body>

                    </Card>
                </Col>
                
            </Row>
        </React.Fragment>
    );
};
DecisionComite.defaultProps = {
    itemsmenu: '/',
};
export default DecisionComite;
