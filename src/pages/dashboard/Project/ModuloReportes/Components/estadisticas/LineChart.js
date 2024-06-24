// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

// simple line chart
const LineChart = ({barChartData}): React$Element<any> => {
    // default options
    const apexLineChartWithLables = {
        chart: {
            height: 680,
            type: 'line',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ['#C0E38E', '#5AC32D', '#3DAC4C', '#6c757d'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            width: [3, 3],
            curve: 'smooth',
        },
        title: {
            text: barChartData.categoria,
            align: 'left',
            style: {
                fontSize: '14px',
            },
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2,
            },
            borderColor: '#f1f3fa',
        },
        markers: {
            style: 'inverted',
            size: 6,
        },
        xaxis: {
            categories: barChartData.axial,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
        responsive: [
            {
                breakpoint: 10,
                options: {
                    chart: {
                        toolbar: {
                            show: false,
                        },
                    },
                    legend: {
                        show: false,
                    },
                },
            },
        ],
    };

    // chart data
    const apexLineChartWithLablesData = [
      {
        name: 'graduados',
        data:barChartData.graduados,
    },
    {
        name: 'inscritos',
        data: barChartData.inscritos,
    },
    {
        name: 'admitidos',
        data:barChartData.admitidos,
    },
    {
        name: 'matriculados',
        data: barChartData.admitidos,
    },
    ];

    return (
        <Card>
            <Card.Body>
            <h4 className="header-title mb-3">{barChartData.programa}</h4>
                <Chart
                    options={apexLineChartWithLables}
                    series={apexLineChartWithLablesData}
                    type="line"
                    className="apex-charts"
                />
            </Card.Body>
        </Card>
    );
};

export default LineChart;
