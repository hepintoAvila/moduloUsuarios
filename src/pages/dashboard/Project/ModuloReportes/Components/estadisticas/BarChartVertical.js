// @flow
import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar, withResponsiveness } from 'britecharts-react';

const ResponsiveBarChart = withResponsiveness(Bar);

// simple horizontal bar chart
const BarChartVertical = ({barChartData}): React$Element<any> => {
    // container style
    const chartContainerStyle = {
        width: '100%',
        height: '300px',
    };
     return (
        <Card>
            <Card.Body>
                <div className="bar-container" style={chartContainerStyle}>
                    <ResponsiveBarChart
                        data={barChartData}
                        isHorizontal={true}
                        height={300}
                        enableLabels={true}
                        percentageAxisToMaxRatio={1.3}
                        labelsNumberFormat={1}
                        colorSchema={['#C0E38E', '#5AC32D', '#3DAC4C', '#6c757d', '#ffbc00', '#39afd1']}
                        margin={{ top: 10, left: 50, bottom: 20, right: 10 }}
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default BarChartVertical;
