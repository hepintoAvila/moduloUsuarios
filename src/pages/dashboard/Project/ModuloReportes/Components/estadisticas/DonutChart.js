// @flow
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Donut, Legend, ResponsiveContainer } from 'britecharts-react';

// donut chart
const DonutChart = (donutDatas): React$Element<any> => {
    return (
      (donutDatas?.donutData?.length>0)?
        <Card>
            <Card.Body>
                <div className="donut-container">
                    <ResponsiveContainer
                        render={() => (
                            <Row>
                                <Col>
                                    <Donut
                                        data={donutDatas?.donutData}
                                        height={300}
                                        internalRadius={80}
                                        colorSchema={['#C0E38E', '#5AC32D', '#3DAC4C', '#6c757d', '#ffbc00', '#39afd1']}
                                        isAnimated={false}
                                        hasFixedHighlightedSlice={true}
                                    />
                                </Col>
                                <Col>
                                    <Legend
                                        data={donutDatas?.donutData}
                                        height={200}
                                        width={250}
                                        numberFormat={'s'}
                                        colorSchema={['#C0E38E', '#5AC32D', '#3DAC4C', '#6c757d', '#ffbc00', '#39afd1']}
                                        margin={{ top: 10, bottom: 10, left: 0, right: 30 }}
                                    />
                                </Col>
                            </Row>
                        )}
                    />
                </div>
            </Card.Body>
        </Card>:''
    );
};

export default DonutChart;
