import React,{memo} from 'react';
import { Row, Card,Tab,Nav } from 'react-bootstrap';
import classnames from 'classnames';
import BarChart from '../estadisticas/BarChart';
import BarChartVertical from '../estadisticas/BarChartVertical';
import DonutChart from '../estadisticas/DonutChart';
const GraficaUno = ({barChartData,donutData}) => {
  //console.log(donutData[0]?.programa)
  return (
    <>
          <Row>
        <Card>
          <Card.Body>
            <Tab.Container defaultActiveKey="1">
              <Nav variant="tabs" className="nav-bordered" as="ul">
                    <Nav.Item as="li" key={'1'}>
                      <Nav.Link href="#" eventKey={'1'} >
                        <i className={classnames('d-md-none', 'd-block', 'me-1')}></i>
                        <span className="d-none d-md-block">Vertical</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" key={'2'}>
                      <Nav.Link href="#" eventKey={'2'} >
                        <i className={classnames('d-md-none', 'd-block', 'me-1')}></i>
                        <span className="d-none d-md-block">Horizontal</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" key={'3'}>
                      <Nav.Link href="#" eventKey={'3'} >
                        <i className={classnames('d-md-none', 'd-block', 'me-1')}></i>
                        <span className="d-none d-md-block">Dona</span>
                      </Nav.Link>
                    </Nav.Item>
              </Nav>
              <Tab.Content className="px-4 pb-4 pt-0 mx-auto">
                    <Tab.Pane eventKey={'1'}  id={'1'} key={'1'}>
                      <br/>
                    <h4 className="header-title mb-3">{donutData[0]?.programa}</h4>
                      <BarChart barChartData={barChartData}/>
                      </Tab.Pane>
              </Tab.Content>
              <Tab.Content className="px-4 pb-4 pt-0 mx-auto">
                    <Tab.Pane eventKey={'2'}  id={'2'} key={'2'} >
                    <h4 className="header-title mb-3">{donutData[0]?.programa}</h4>
                      <BarChartVertical barChartData={barChartData}/>
                      </Tab.Pane>
              </Tab.Content>
              <Tab.Content className="px-4 pb-4 pt-0 mx-auto">
                    <Tab.Pane eventKey={'3'}  id={'3'} key={'3'} >
                    <h4 className="header-title mb-3">{barChartData[0]?.programa}</h4>
                      <DonutChart donutData={donutData}/>
                      </Tab.Pane>
              </Tab.Content>
            </Tab.Container>

          </Card.Body>
        </Card>
      </Row>
    </>
    );
};
export default memo(GraficaUno);
