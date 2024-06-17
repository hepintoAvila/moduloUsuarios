/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Tab, Nav, Button } from 'react-bootstrap';
import classnames from 'classnames';
import Table from '../../../../components/Table';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import BtnNotificados from './Components/BtnNotificados';
import encodeBasicUrl from '../../../../utils/encodeBasicUrl';
import { NotificacionesContext } from '../../../../layouts/context/NotificacionesProvider';
import Swal from 'sweetalert2';
import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';
import LogoSena from '../ModuloSolicitudComite/Components/LogoSena';



const ActionColumn = ({ row }) => {
  const obj = {
    key: row.cells[0].value,
    name: row.cells[1].value,
    email: row.cells[2].value,
  };

  return (
    <React.Fragment>
      <BtnNotificados obj={obj} />
    </React.Fragment>
  );
};

const ConsultaNotificaciones = (props) => {
  const [sinAgendar, setSinAgendar] = useState([]);
  const [agendada, setAgendada] = useState([]);
  const tabContents = [
    {
      id: '1',
      title: 'Sin Agendar',
      icon: 'mdi mdi-home-variant',
      text: '',
    },
    {
      id: '2',
      title: 'Agendadas',
      icon: 'mdi mdi-account-circle',
      text: '',
    },
  ];
  const { itemsSolicitudes, query } = useContext(NotificacionesContext);

  const { sizePerPageList } = useContext(DashboardContext);
  const datos = itemsSolicitudes?.data?.Solicitudes || [{}];

  const columnsSinAgendar = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Aprendiz',
      accessor: 'aprendiz',
      sort: true,
    },
    {
      Header: 'Instructor',
      accessor: 'instructor',
      sort: true,
    },
    {
      Header: 'Tipo Solicitud',
      accessor: 'tipoSolicitud',
      sort: true,
    },
    {
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
  ];

  const columnsAgendar = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
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
    },
    {
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
      sort: false,
      accessor: 'fechaHoraAgendada',
    },
    {
      Header: 'Acciones',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumn,
    },
  ];

  useEffect(() => {
    query('ModuloSolicitudComite', 'EnviarSolicitud', [
      { opcion: encodeBasicUrl('ConsultarSolicitud'), obj: 'ConsultarSolicitud', sw: '1' },
    ]);
  }, [query]);

  useEffect(() => {
    const filteredSinAgendar = datos?.filter((row) => row?.estado === 'SIN AGENDA');
    const filteredAgendada = datos?.filter((row) => row?.estado === 'AGENDADA');
    setSinAgendar(filteredSinAgendar);
    setAgendada(filteredAgendada);
  }, [datos]);

  const adjuntarLocalstore = () => {

    let dataInLocalStorage = localStorage.getItem('idsIncidentes');
    let data = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : [];
    if (data.length > 0) {
      return (window.location.hash = '/dashboard/ModuloNotificaciones/AgendarCitas');
    } else {
      Swal.fire('No tiene items seleccionado');
    }
  };
/*
  useEffect(() => {
    if(selectedItemsConsolidados.length>0){
      //localStorage.setItem('idsIncidentes', JSON.stringify(selectedItemsConsolidados));
    }
}, [selectedItemsConsolidados]);
*/


  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              <h4 className="header-title mb-3">CONSULTA DE SOLICITUDES</h4>
              <Tab.Container defaultActiveKey="Sin Agendar">
                <Nav variant="tabs">
                  {tabContents.map((tab, index) => (
                    <Nav.Item key={index}>
                      <Nav.Link href="#" eventKey={tab.title}>
                        <i className={classnames(tab.icon, 'd-md-none', 'd-block', 'me-1')}></i>
                        <span className="d-none d-md-block">{tab.title}</span>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
                <Tab.Content>
                  {tabContents.map((tab, index) => (
                    <Tab.Pane eventKey={tab.title} id={tab.id} key={index}>
                      <Row>
                        {(() => {
                          switch (Number(index)) {
                            case 0:
                              return (
                                <>

                                    <Col lg={12}>

                                      {sinAgendar?.length > 0 ? (

                                        <><Table
                                          columns={columnsAgendar}
                                          data={sinAgendar}
                                          pageSize={5}
                                          sizePerPageList={sizePerPageList}
                                          isSortable={true}
                                          pagination={true}
                                          theadClass="table-light"
                                          searchBoxClass="mt-2 mb-3"
                                          isSearchable={true}
                                          nametable={'table_2'}
                                          titleTable={'LISTADO DE NOTIFICACIONES'} />
                                  {<Button variant="primary" type="submit" onClick={adjuntarLocalstore} className="btnenagendar">AGENDAR</Button>}</>
                                      ) : (
                                        <PermisoAlert />
                                      )}
                                    </Col>
                                 </>
                              );
                            case 1:
                              return (
                                <Row>
                                  <Col sm="12">
                                    {agendada?.length > 0 ? (
                                      <Table
                                        columns={columnsSinAgendar}
                                        data={agendada}
                                        pageSize={5}
                                        sizePerPageList={sizePerPageList}
                                        isSortable={true}
                                        pagination={true}
                                        theadClass="table-light"
                                        searchBoxClass="mt-2 mb-3"
                                        isSearchable={true}
                                        nametable={'table_1'}
                                        titleTable={'LISTADO DE NOTIFICACIONES'}
                                      />
                                    ) : (
                                      <PermisoAlert />
                                    )}
                                  </Col>
                                </Row>
                              );
                            default:
                              return <><LogoSena/></>;
                          }
                        })()}
                      </Row>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ConsultaNotificaciones;
