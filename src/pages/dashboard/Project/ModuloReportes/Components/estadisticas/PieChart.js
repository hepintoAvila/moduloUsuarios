// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

// simple pie chart
const PieChart = (props): React$Element<any> => {
  const pieChart ={
    totalAgendada:Number(props?.itemsGraficos?.items[0]?.Total) + Number(props?.itemsGraficos?.items[1]?.Total),
    totalSinagendar:Number(props?.itemsGraficos?.items[2]?.Total),
    totalSolicitudes:Number(props?.itemsGraficos?.items[3]?.Total),
    nombre:'GRÁFICA DE SOLICITUDES CON FECHAS:' + props?.itemsGraficos?.items[0]?.Periodo,
  }
    const apexDonutOpts = {
        chart: {
            height: 320,
            type: 'pie',
        },
        labels: ['Total Agendadas', 'Total Sin agendar', 'Total Solicitudes'],
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
    const apexDonutData = [Number(pieChart.totalAgendada), Number(pieChart.totalSinagendar), Number(pieChart.totalSolicitudes)];
//console.log(pieChart);
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mb-3">{pieChart.nombre}</h4>
                <Chart options={apexDonutOpts} series={apexDonutData} type="pie" height={320} className="apex-charts" />
            </Card.Body>
        </Card>
    );
};

export default PieChart;
