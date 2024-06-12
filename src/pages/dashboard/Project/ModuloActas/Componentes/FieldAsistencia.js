import React, { useContext } from 'react';
import FormAsistencia from './FormAsistencia';
import ListAsistentes from './ListAsistentes';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { Row, Col, Card, Tab, Nav } from 'react-bootstrap';
import classnames from 'classnames';


const FieldAsistencia = (props) => {

  const { itemUrl, tipo } = useContext(DashboardContext);



  let userInfo = sessionStorage.getItem('hyper_user');
  const user = JSON.parse(userInfo);
  const tabContents = [
    {
      id: '1',
      title: 'Registrar Asistente',
      icon: 'mdi mdi-home-variant',
      text: '',
    },
    {
      id: '2',
      title: 'Listar Asistente',
      icon: 'mdi mdi-account-circle',
      text: '',

    },
  ];
  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              <Tab.Container defaultActiveKey="0">
                <Nav variant="tabs">
                  {tabContents.map((tab, index) => {
                    return (
                      <Nav.Item key={index}>
                        <Nav.Link href="#" eventKey={tab.title}>
                          <i
                            className={classnames(
                              tab.icon,
                              'd-md-none',
                              'd-block',
                              'me-1'
                            )}></i>
                          <span className="d-none d-md-block">{tab.title}</span>
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                </Nav>
                <Tab.Content>
                  {tabContents?.map((tab, index) => {
                    return (
                      <Tab.Pane eventKey={tab.title} id={tab.id} key={index}>
                        <Row>
                          {(() => {
                            switch (Number(index)) {
                              case 0:
                                return (
                                  <>
                                    <Row>
                                      <Col lg={12}>
                                        <FormAsistencia
                                          opcionBusqueda={props.opcionBusqueda}
                                          accion={itemUrl}
                                          tipo={tipo}
                                          title={props.title}
                                          validated={props.validated}
                                          opcion={'solicitudes'}
                                          textBtn={'Registrar solicitudes'}
                                          entidad={user[0]?.entidad}
                                          idActa={props.idActa}
                                        />
                                      </Col>
                                    </Row>
                                  </>);
                              case 1:
                                return (
                                  <Row>
                                    <Col sm="12">
                                    <ListAsistentes
                                          opcionBusqueda={props.opcionBusqueda}
                                          accion={itemUrl}
                                          tipo={tipo}
                                          title={props.title}
                                          validated={props.validated}
                                          opcion={'solicitudes'}
                                          textBtn={'Registrar solicitudes'}
                                          entidad={user[0]?.entidad}
                                          idActa={props.idActa}
                                        />
                                    </Col>
                                  </Row>
                                );
                              default:
                                return (<>{''}</>)
                            }
                          })()}

                        </Row>
                      </Tab.Pane>
                    );
                  })}
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
export default FieldAsistencia;
