// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

// simple bar chart
const BarChartMaInsGra = (props) => {
    // default options
    const pieChart ={
      totalAgendada:Number(props?.itemsGraficos?.items[0]?.Total) + Number(props?.itemsGraficos?.items[1]?.Total),
      totalSinagendar:Number(props?.itemsGraficos?.items[2]?.Total),
      totalSolicitudes:Number(props?.itemsGraficos?.items[3]?.Total),
      nombre:'GRÁFICA DE SOLICITUDES CON FECHAS:' + props?.itemsGraficos?.items[0]?.Periodo,
    }
    const apexBarChartOpts = {
        chart: {
            height: 380,
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff'],
            },
        },
        colors: ['#C0E38E', '#5AC32D', '#3DAC4C'],
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff'],
        },

        xaxis: {
            categories: ['Agedadas', 'SinAgendar', 'Encomite'],
        },
        legend: {
            offsetY: -10,
        },
        states: {
            hover: {
                filter: 'none',
            },
        },
        grid: {
            borderColor: '#f1f3fa',
        },
    };

    // chart data
    const apexBarChartData = [
      {
        name: 'Agendadas',
        data:[pieChart?.totalAgendada],
    },{
      name: 'Sin Agendar',
      data:[pieChart?.totalSinagendar],
    },{
      name: 'Total',
      data:[pieChart?.totalSolicitudes],
    },
    ];

    return (
        <Card>
            <Card.Body>
              <h4 className="header-title mb-3">{pieChart?.nombre}</h4>
                <Chart options={apexBarChartOpts} series={apexBarChartData} type="bar" className="apex-charts" />
            </Card.Body>
        </Card>
    );
};

export default BarChartMaInsGra;
