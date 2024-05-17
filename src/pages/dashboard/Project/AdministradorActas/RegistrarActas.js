/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React from 'react';
//import { DashboardContext } from '../../../../layouts/context/DashboardContext';
//import { usePermisos } from '../../../../hooks/usePermisos';
import { Row, Col, Card, Tab, Nav, Button } from 'react-bootstrap';
import classnames from 'classnames';

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
                                            <span className="d-none d-lg-block">Hechos</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="nav-item">
                                        <Nav.Link href="#" eventKey="2" className="nav-link rounded-0">
                                            <i className={classnames('mdi mdi-book-open-page-variant', 'font-18')}></i>
                                            <span className="d-none d-lg-block">Contemplación del Caso</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link href="#" eventKey="3" className="nav-link rounded-0">
                                            <i className={classnames('mdi mdi-book-open-variant', 'font-18')}></i>
                                            <span className="d-none d-lg-block">Frente a los hechos</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link href="#" eventKey="4" className="nav-link rounded-0">
                                            <i className={classnames('mdi mdi-book-plus-multiple', 'font-18')}></i>
                                            <span className="d-none d-lg-block">Recomendación del Caso</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link href="#" eventKey="5" className="nav-link rounded-0">
                                            <i className={classnames('mdi mdi-book-plus-multiple', 'font-18')}></i>
                                            <span className="d-none d-lg-block">COMPROMISOS</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Row>
                                    <Col lg={12}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="1">
                                            <Recordatorio id={"1"} titulo={'Hechos:'}/>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="2">
                                            <Recordatorio id={"2"} titulo={'Contemplación del Caso:'}/>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="3">
                                            <Recordatorio id={"3"} titulo={'Frente a los hechos:'}/>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="4">
                                            <Recordatorio id={"4"} titulo={'Recomendación del Caso:'}/>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="5">
                                            <Recordatorio id={"5"} titulo={'Compromisos:'}/>
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

