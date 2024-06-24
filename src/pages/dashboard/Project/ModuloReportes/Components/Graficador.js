/* eslint-disable default-case */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import PieChart from './estadisticas/PieChart';
import BarChartMaInsGra from './estadisticas/BarChartMaInsGra';
const Graficador = (props) => {
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col sm={12}>
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col xl={6}>
                          {
                            props?.itemsGraficos?.items?.length > 0 &&
                            <PieChart itemsGraficos={props?.itemsGraficos}/>
                          }
                        </Col>
                        <Col xl={6}>
                          {
                            props?.itemsGraficos?.items?.length > 0 &&
                            <BarChartMaInsGra itemsGraficos={props?.itemsGraficos}/>
                           }
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Graficador;
