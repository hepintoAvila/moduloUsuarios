/* eslint-disable default-case */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import LineChart from './LineChart';
import ApexBarChartData from './ApexBarChartData';
import GraficaUno from './GraficaUno';
import PieChart from './PieChart';
import MixedChart from './MixedChart';
const Graficador = (props) => {
const categoryGraduados=[];
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
                                                categoryGraduados?.DonutData?.length> 0 &&
                                                <GraficaUno barChartData={categoryGraduados.Chart} donutData={categoryGraduados.DonutData} />

                                            }
                                            </Col>
                                            <Col xl={6}>
                                              {
                                                categoryGraduados?.ApexBarChartData?.axial?.length> 0 &&
                                              <ApexBarChartData ApexBarChartData={categoryGraduados?.ApexBarChartData} />
                                          }
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xl={6}>
                                              {
                                              categoryGraduados?.ApexBarChartData?.axial?.length> 0 &&
                                             <LineChart barChartData={categoryGraduados?.ApexBarChartData} />
                                            }
                                            </Col>
                                            <Col xl={6}>
                                            {
                                              categoryGraduados?.Piechart?.programa?.length> 0 &&
                                              <PieChart pieChart={categoryGraduados?.Piechart} />
                                            }
                                              </Col>
                                            </Row>
                                            <Row>
                                          <Col>
                                            {
                                              categoryGraduados?.Piechart?.programa?.length> 0 &&
                                              <MixedChart grafiCuatro={categoryGraduados?.ApexBarChartData} />
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
