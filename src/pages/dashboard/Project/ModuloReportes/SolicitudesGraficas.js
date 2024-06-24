import React from 'react';
import { Row, Col, Tab, Card, Nav} from 'react-bootstrap';
import classnames from 'classnames';
import Graficador from './Components/Graficador';

const SolicitudesGraficas = (props) => {
const tabItems = [
  {
    id: 1,
    title: 'Graficar Solicitudes',
    icon: 'mdi mdi-home-variant',
    text: 'Clasificación por Consultas',
  },
];

return (
    <React.Fragment>
      <Row>
        <Card>
          <Card.Body>
            <Tab.Container defaultActiveKey="1">
              <Nav variant="tabs" className="nav-bordered" as="ul">
                {tabItems?.map((tab, index) => {
                  return (
                    <Nav.Item as="li" key={index}>
                      <Nav.Link href="#" eventKey={tab.id} >
                        <i className={classnames(tab.icon, 'd-md-none', 'd-block', 'me-1')}></i>
                        <span className="d-none d-md-block">{tab.title}</span>
                      </Nav.Link>
                    </Nav.Item>

                  )
                })}
              </Nav>
              <Tab.Content className="px-4 pb-4 pt-0 mx-auto">
                {tabItems?.map((tab, index) => {
                  return (
                    <Tab.Pane eventKey={tab.id} id={tab.id} key={index}>
                      <Row>
                        <Col sm="12 mt-1">
                          {(() => {
                            switch (tab.id) {
                              case 1:
                                return (
                                    <>
                                      <Graficador itemsGraficos={props?.itemsGraficos}/>
                                    </>
                                );
                              default:
                                return (
                                  'defould'
                                );
                            }
                          })()}

                        </Col>
                      </Row>

                    </Tab.Pane>
                  );
                })}
              </Tab.Content>
            </Tab.Container>
          </Card.Body>
        </Card>
      </Row>
    </React.Fragment>
  );
};

export default SolicitudesGraficas;
