/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card,  } from 'react-bootstrap';
//import Swal from 'sweetalert2';

 
import Table from '../../../../../components/Table';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { useAdminUsuarios } from '../../../../../hooks/useAdminUsuarios';
import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';

const CarSolicitudeEnviadas = (props) => {
  //const permisos = props.permisos || {};

  const {itemsSolicitudByID,query} = useAdminUsuarios()

  const {
    sizePerPageList
  } = useContext(DashboardContext);
  const datos = itemsSolicitudByID?.data?.Solicitudes|| [{}];
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
      accessor: 'tipoSolicitud ',
      sort: true,
    }
    , {
      Header: 'Tipo de Atención',
      accessor: 'tipoAtencion',
      sort: false,
    },
    {
      Header: 'Fecha Hora Hechos',
      accessor: 'fechaHora',
      sort: false,
    },
    {
      Header: 'Fecha Hora Propuesta',
      accessor: 'fechaHoraPropuesta',
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
      Header: 'Action',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
    },
  ];

  useEffect(() => {
    query('ModuloSolicitudComite', 'ConsultarSolicitud', [{ opcion: encodeBasicUrl('ConsultarSolicitud'), obj: 'ConsultarSolicitudByID',sw:0 }]);
  }, [query])

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

export default CarSolicitudeEnviadas;