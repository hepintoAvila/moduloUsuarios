/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Tab, Nav, Button, } from 'react-bootstrap';
import classnames from 'classnames';
//import Swal from 'sweetalert2';


import Table from '../../../../components/Table';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import BtnSeccionAction from './Components/BtnSeccionAction';
import encodeBasicUrl from '../../../../utils/encodeBasicUrl';
import { NotificacionesContext } from '../../../../layouts/context/NotificacionesProvider';
import Swal from 'sweetalert2';

function sumarIdsDelLocalStorage() {
  // Obtener los datos actuales del localStorage si existen
  let dataInLocalStorage = localStorage.getItem('idsIncidentes');
  let data = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : [];

  // Usar reduce para sumar los valores de la propiedad 'id'
  const sumaDeIds = data.reduce((acumulador, objeto) => {
    const valorId = parseInt(objeto.id, 10) || 0; // Asegurarse de que sea un número
    return acumulador + valorId;
  }, 0);

  return sumaDeIds;
}

const ActionColumn = ({ row }) => {

  const {
    isChecked,isCheckedItem,
    validated,handleOnChange
  } = useContext(DashboardContext);

  let permiso = sessionStorage.getItem('PERMISO');
  const localPermiso = JSON.parse(permiso);
  const obj = {
    isChecked,
    isCheckedItem,
    handleOnChange,
    localPermiso,
    validated,
    key: row.cells[0].value,
    row: row.cells[0].value,
    name: row.cells[1].value,
  }
  return (
    <React.Fragment>
      <BtnSeccionAction obj={obj}>
      </BtnSeccionAction>
    </React.Fragment>
  );
};
const ConsultaNotificaciones = (props) => {
  const [sinAgendar,setSinAgendar] = useState([])
  const [agendada,setAgendada] = useState([])
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
  const { itemsSolicitudes, query } = useContext(NotificacionesContext)

  const {
    sizePerPageList
  } = useContext(DashboardContext);
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
      Header: 'Acciones',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumn,
    },
  ];
  useEffect(() => {
    query('ModuloSolicitudComite', 'EnviarSolicitud', [{ opcion: encodeBasicUrl('ConsultarSolicitud'), obj: 'ConsultarSolicitud', sw: '1' }]);
  }, [query])

  useEffect(() => {
  const filteredSinAgendar = datos?.filter((row) => {
    return row?.estado === 'SIN AGENDA';
    });
    const filteredAgendada = datos?.filter((row) => {
      return row?.estado === 'AGENDADA';
      });
    setSinAgendar(filteredSinAgendar)
    setAgendada(filteredAgendada)
  }, [datos])

  const adjuntarLocalstore = () => {

    const resultado = sumarIdsDelLocalStorage();

    if (Number(resultado) > 0) {
      return window.location.hash='/dashboard/ModuloNotificaciones/AgendarCitas';
    } else {
        Swal.fire('No tiene items seleccionado');
    }
};

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              <h4 className="header-title mb-3">CONSULTA DE SOLICITUDES</h4>
              <Tab.Container defaultActiveKey="Sin Agendar">
                <Nav variant="tabs">
                  {tabContents.map((tab, index) => {
                    return (
                      <Nav.Item key={index}>
                        <Nav.Link href="#" eventKey={tab.title}>
                          <i
                            className={classnames(
                              tab.icon,
                              'd-md-none',
                              'd-block',
                              'me-1'
                            )}></i>
                          <span className="d-none d-md-block">{tab.title}</span>
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                </Nav>
                <Tab.Content>
                  {tabContents?.map((tab, index) => {
                    return (
                      <Tab.Pane eventKey={tab.title} id={tab.id} key={index}>
                        <Row>
                          {(() => {
                            switch (Number(index)) {
                              case 0:
                                return (
                                  <>
                                    <Row>
                                      <Col lg={12}>
                                        {sinAgendar?.length > 0 && <Table
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
                                          titleTable={'LISTADO DE NOTIFICACIONES'}
                                        />}
                                      </Col>
                                    </Row>

                                    <Row>
                        <Col sm={10}></Col>{' '}
                        <Col sm={2}>
                        {sinAgendar?.length > 0 && <Button
                                variant="primary"
                                type="submit"
                                onClick={() => adjuntarLocalstore()}>
                                AGENDAR
                            </Button>}
                        </Col>
                    </Row>
                                  </>);
                              case 1:
                                return (
                                  <Row>
                                    <Col sm="12">
                                    {agendada?.length > 0 && <Table
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
                                        />}
                                    </Col>
                                  </Row>
                                );
                              default:
                                return (<>{''}</>)
                            }
                          })()}

                        </Row>
                      </Tab.Pane>
                    );
                  })}
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
