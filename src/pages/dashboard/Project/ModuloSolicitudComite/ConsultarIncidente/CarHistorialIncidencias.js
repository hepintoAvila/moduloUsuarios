/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext } from 'react';
import { Row, Col, Card,  } from 'react-bootstrap';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
//import Swal from 'sweetalert2';

 
import Table from '../../../../../components/Table';
 
const CarHistorialIncidencias = (props) => {
  //const permisos = props.permisos || {};

 
  const {itemsQueryByIdAprendiz} = useContext(NotificacionesContext)
  const {
    sizePerPageList
  } = useContext(DashboardContext);
  const datos = itemsQueryByIdAprendiz?.data?.Solicitudes|| [{}];
 
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'codigoFicha',
      accessor: 'codigoFicha',
      sort: false,
    },
    {
      Header: 'Aprendiz',
      accessor: 'aprendiz',
      sort: true,
    },
    {
      Header: 'Tipo Solicitud',
      accessor: 'tipoSolicitud',
      sort: true,
    }
    , {
      Header: 'Tipo de Atención',
      accessor: 'tipoAtencion',
      sort: false,
    },
    {
      Header: 'Fecha Solicitud',
      accessor: 'fechaSolicitud',
      sort: false,
    },
      {
        Header: 'Fecha Hora Agendada',
        accessor: 'fechaHoraAgendada',
        sort: false,
      },
      
      {
        Header: 'Estado',
        accessor: 'estado',
        sort: false,
      },
    {
      Header: 'Acciones',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
    },
  ];
 
  return (
    <>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              {datos?.length > 0 && <Table
                    columns={columns}
                    data={datos}
                    pageSize={5}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                    theadClass="table-light"
                    searchBoxClass="mt-2 mb-3"
                    isSearchable={true}
                    nametable={props.accion}
                    titleTable={'HISTORIAL DE SOLICITUDES'}
  />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
      </Row>
    </>
  );
};

export default CarHistorialIncidencias;