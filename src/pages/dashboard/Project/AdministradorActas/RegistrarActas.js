/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React from 'react';
//import { DashboardContext } from '../../../../layouts/context/DashboardContext';
//import { usePermisos } from '../../../../hooks/usePermisos';
import { Row, Col, Card, Tab, Nav, Button } from 'react-bootstrap';
import classnames from 'classnames';
import DatosBasicos from './FormActas/DatosBasicos';
import Reglas from './FormActas/Reglas';
import DecisionComite from './FormActas/DecisionComite';
import Recordatorio from './FormActas/Recordatorio';
 
//const { tipo } = useContext(DashboardContext)
//const { permisos } = usePermisos(tipo);

const RegistrarActas  = () => {
   return(
    <React.Fragment>
            <Tab.Container defaultActiveKey="1">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Nav as="ul" variant="pills" className="nav nav-pills bg-nav-pills nav-justified mb-3">
                                    <Nav.Item as="li" className="nav-item">
                                        <Nav.Link href="#" eventKey="1" className="nav-link rounded-0">
                                            <i className={classnames('mdi mdi-book-account-outline', 'font-18')}></i>
                                            <span className="d-none d-lg-block">DATOS BÁSICOS DEL ACTA</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="nav-item">
                                        <Nav.Link href="#" eventKey="2" className="nav-link rounded-0">
                                            <i className={classnames('mdi mdi-book-open-page-variant', 'font-18')}></i>
                                            <span className="d-none d-lg-block">REGLAS</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link href="#" eventKey="3" className="nav-link rounded-0">
                                            <i className={classnames('mdi mdi-book-open-variant', 'font-18')}></i>
                                            <span className="d-none d-lg-block">DESCISIÓN COMITÉ</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link href="#" eventKey="4" className="nav-link rounded-0">
                                            <i className={classnames('mdi mdi-book-plus-multiple', 'font-18')}></i>
                                            <span className="d-none d-lg-block">RECORDATORIO</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Row>
                                    <Col lg={8}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="1">
                                              <DatosBasicos/>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="2">
                                            <Reglas/>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="3">
                                            <DecisionComite/>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="4">
                                            <Recordatorio/>
                                            </Tab.Pane>                                           
                                        </Tab.Content>

                                    </Col>
                                  </Row>
                                  <Row>
                                  <Col sm={12}>
                                        <ul className="list-inline wizard mb-0">
                                            <li className="next list-inline-item float-end">
                                                <Button variant="success">Registrar Acta</Button>
                                            </li>
                                        </ul>
                                    </Col>
                                    </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Tab.Container>
    
            </React.Fragment>
  );
};
RegistrarActas.defaultProps = {
  itemsmenu: '/',
};
export default RegistrarActas;

