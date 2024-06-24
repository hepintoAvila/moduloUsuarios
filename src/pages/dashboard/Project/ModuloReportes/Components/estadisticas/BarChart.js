// @flow
import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar, withResponsiveness } from 'britecharts-react';

const ResponsiveBarChart = withResponsiveness(Bar);

// simple bar chart
const BarChart = (Data): React$Element<any> => {
    // container style
    const chartContainerStyle = {
        width: '100%',
        height: '300px',
    };
    return (
        <Card>
            <Card.Body>
                <div className="bar-container" style={chartContainerStyle}>
                   {
                   (Data?.barChartData?.length>0)?
                   <ResponsiveBarChart
                        isAnimated={false}
                        data={Data?.barChartData}
                        isHorizontal={false}
                        height={300}
                        betweenBarsPadding={0.5}
                        colorSchema={['#C0E38E']}
                        margin={{ top: 10, left: 50, bottom: 20, right: 10 }}
                    />:''
                    }
                </div>
            </Card.Body>
        </Card>
    );
};

export default BarChart;
