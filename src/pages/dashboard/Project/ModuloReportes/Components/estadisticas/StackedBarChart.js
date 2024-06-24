// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

// stacked bar chart
const StackedBarChart = ({ApexBarChartData}): React$Element<any> => {
    // default options
    const apexBarChartStackedOpts = {
        chart: {
            height: 380,
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            show: false,
        },
        xaxis: {
            categories: ApexBarChartData.axial,
        },
        yaxis: {
            title: {
                text: undefined,
            },
        },
        colors: ['#C0E38E', '#5AC32D', '#3DAC4C', '#6c757d'],
        tooltip: {
            y: {
                formatter: function (val) {
                    return val;
                },
            },
        },
        fill: {
            opacity: 1,
        },
        states: {
            hover: {
                filter: 'none',
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
        },
        grid: {
            borderColor: '#f1f3fa',
        },
    };

    // chart data
    const apexBarChartStackedData = [
      {
        name: 'graduados',
        data:ApexBarChartData.graduados,
    },
    {
        name: 'inscritos',
        data: ApexBarChartData.inscritos,
    },
    {
        name: 'admitidos',
        data:ApexBarChartData.admitidos,
    },
    {
        name: 'matriculados',
        data: ApexBarChartData.admitidos,
    },
    ];
//console.log('ApexBarChartData',ApexBarChartData);
    return (
        <Card>
            <Card.Body>
            <h4 className="header-title mb-3">{ApexBarChartData.programa}</h4>
                <Chart
                    options={apexBarChartStackedOpts}
                    series={apexBarChartStackedData}
                    type="bar"
                    className="apex-charts"
                />
            </Card.Body>
        </Card>
    );
};

export default StackedBarChart;
