import React,{memo} from 'react';
import { Row, Card,Tab,Nav } from 'react-bootstrap';
import classnames from 'classnames';
import BarChartMaInsGra from '../estadisticas/BarChartMaInsGra';
import StackedBarChart from '../estadisticas/StackedBarChart';
const ApexBarChartData = ({ApexBarChartData}) => {
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
              </Nav>
              <Tab.Content className="px-4 pb-4 pt-0 mx-auto">
                    <Tab.Pane eventKey={'1'}  id={'1'} key={'1'}><BarChartMaInsGra ApexBarChartData={ApexBarChartData}/></Tab.Pane>
              </Tab.Content>
              <Tab.Content className="px-4 pb-4 pt-0 mx-auto">
                    <Tab.Pane eventKey={'2'}  id={'2'} key={'2'} ><StackedBarChart ApexBarChartData={ApexBarChartData}/></Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Card.Body>
        </Card>
      </Row>
    </>
    );
};
export default memo(ApexBarChartData);
