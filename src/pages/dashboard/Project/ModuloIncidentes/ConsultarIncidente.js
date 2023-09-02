/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React from 'react';
//import { DashboardContext } from '../../../../layouts/context/DashboardContext';
//import { usePermisos } from '../../../../hooks/usePermisos';
import { Row, Col, Card, Tab, Nav} from 'react-bootstrap';
import classnames from 'classnames';
import CardDatosPersonales from './CardDatosPersonales';
import CardDatoEvidencias from './CardDatoEvidencias';
import CardDatosIncidente from './CardDatosIncidente';
 
//const { tipo } = useContext(DashboardContext)
//const { permisos } = usePermisos(tipo);

const ConsultarIncidente  = () => {
    const datos = [
        { id: 1, name: 'Hyper-admin-design.zip', size: '2.3MB', ext: '.zip' },
        { id: 2, name: 'Dashboard-design.jpg', size: '0.3MB', ext: '.jpg' },
        { id: 3, name: 'Admin-bug-report.mp4', size: '4.1MB', ext: '.mp4' },
    ];
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
                                            <span className="d-none d-lg-block">DATOS BÁSICOS</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="nav-item">
                                        <Nav.Link href="#" eventKey="2" className="nav-link rounded-0">
                                            <i className={classnames('mdi mdi-book-open-page-variant', 'font-18')}></i>
                                            <span className="d-none d-lg-block">DESCRIPCÓN Y EVIDENCIAS</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Row>
                                    <Col lg={8}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="1">
                                            <CardDatosPersonales/> 
                                            <CardDatosIncidente/> 
    
                                            { datos?.length>0 && datos?.map((f, idx) => { 
                                                <CardDatoEvidencias  f={f} idx={idx}/>
                                            })}  
                                                                                    
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="2">
                                            <h4 className="header-title">Descripción de los Hechos</h4>
                                            <p className="text-muted">Hechos constitutivos de la presunta falta: El aprendiz se ausentó 4 días de los 5 días programados para la formación transversal correspondiente a la Competencia: Promover la interacción idónea consigo mismo, con los demás y con la naturaleza en los contextos laboral y social y RAPS: Asumir responsablemente los criterios de preservación y conservación del Medio Ambiente y de Desarrollo Sostenible, en el ejercicio de su desempeño laboral y social; cuyos motivos manifestados por el aprendiz sin presentar pruebas que soporten lo expresado, están registrados en el aplicativo Sofia Plus.</p>
                                            
                                            </Tab.Pane>
                                        </Tab.Content>

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
ConsultarIncidente.defaultProps = {
  itemsmenu: '/',
};
export default ConsultarIncidente;

