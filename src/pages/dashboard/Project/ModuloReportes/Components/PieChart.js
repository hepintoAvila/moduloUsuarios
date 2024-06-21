// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

// simple pie chart
const PieChart = ({pieChart}): React$Element<any> => {
    // default options
    const apexDonutOpts = {
        chart: {
            height: 320,
            type: 'pie',
        },
        labels: ['Total General', 'Total Rango', 'Total Programa'],
        colors: ['#C0E38E', '#5AC32D', '#6c757d'],
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            verticalAlign: 'middle',
            floating: false,
            fontSize: '14px',
            offsetX: 0,
            offsetY: -10,
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    chart: {
                        height: 240,
                    },
                    legend: {
                        show: false,
                    },
                },
            },
        ],
    };

    // chart data
    const apexDonutData = [Number(pieChart.totalgeneral), Number(pieChart.totalrango), Number(pieChart.totalprograma)];
//console.log(pieChart);
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mb-3">{pieChart.programa}</h4>
                <Chart options={apexDonutOpts} series={apexDonutData} type="pie" height={320} className="apex-charts" />
            </Card.Body>
        </Card>
    );
};

export default PieChart;
