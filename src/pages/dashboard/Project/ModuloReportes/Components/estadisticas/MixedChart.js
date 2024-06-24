// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

// Mixed chart
const MixedChart = ({grafiCuatro}): React$Element<any> => {
    // default options
    var apexMixedOpts = {
        chart: {
            height: 380,
            type: 'line',
            stacked: false,
            toolbar: {
                show: false,
            },
        },
        stroke: {
            width: [0, 2, 4],
            curve: 'smooth',
        },
        plotOptions: {
            bar: {
                columnWidth: '50%',
            },
        },
        colors: ['#C0E38E', '#5AC32D', '#3DAC4C', '#6c757d'],
        fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: 'vertical',
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100],
            },
        },
        labels: grafiCuatro.axial,
        markers: {
            size: 0,
        },
        legend: {
            offsetY: -10,
        },
        xaxis: {
            type: 'date',
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== 'undefined') {
                        return y.toFixed(0) + ' Total';
                    }
                    return y;
                },
            },
        },
        grid: {
            borderColor: '#f1f3fa',
        },
    };

    // chart data
    const apexMixedData = [
        {
            name: 'Graduados',
            type: 'column',
            data:grafiCuatro.graduados
        },
        {
            name: 'Inscritos',
            type: 'area',
            data:grafiCuatro.admitidos,
        },
        {
            name: 'admitidos',
            type: 'line',
            data:grafiCuatro.admitidos,
        },{
            name: 'admitidos',
            type: 'line',
            data: grafiCuatro.admitidos,
        },
    ];

    return (
        <Card>
            <Card.Body>
            <h4 className="header-title mb-3">{grafiCuatro.programa}</h4>
                <Chart
                    options={apexMixedOpts}
                    series={apexMixedData}
                    type="line"
                    height={320}
                    className="apex-charts"
                />
            </Card.Body>
        </Card>
    );
};

export default MixedChart;
