/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Tab, Nav, } from 'react-bootstrap';
import classnames from 'classnames'; 
//import Swal from 'sweetalert2';


import Table from '../../../../components/Table';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import BtnSeccionAction from './Components/BtnSeccionAction';
import OpcionsForm from './Form/OpcionsForm';
import encodeBasicUrl from '../../../../utils/encodeBasicUrl';
import { NotificacionesContext } from '../../../../layouts/context/NotificacionesProvider';

const ActionColumn = ({ row }) => {

  const {
    validated,
    setOpen,
    setItemsUpdate,
    open,
    setitemsMenuPrincipal
  } = useContext(DashboardContext);

  const toggleSignUp = (id, opciones) => {

    let permiso = sessionStorage.getItem('PERMISO');
    const localPermiso = JSON.parse(permiso);
    if (localPermiso?.update === 'N') {

      if (row.cells[0].row.values.id === id)
        setItemsUpdate(row?.cells[0]?.row?.values)
      //toggle()
    } else {
      sessionStorage.removeItem('OPTIONS')

      const menuitems = window.location.hash.split('#/')[1];
      const [seccion] = menuitems?.split('/');
      let obj = {}
      {
        (() => {
          switch (sessionStorage.getItem('OPTIONS')) {
            case 'AGENDAR':
              obj = { principal: seccion.length === 0 ? `dashboard/AgendarCitas?p=${id}` : seccion, seccion: `AgendarCitas?p=${id}` }
              sessionStorage.setItem('ITEM_SELECT', JSON.stringify({
                tipo: obj.principal, menu: obj.seccion,
              }));
              break
            case 'ACTAS':
              obj = { principal: seccion.length === 0 ? `dashboard/RegistrarActa?p=${id}` : seccion, seccion: `RegistrarActa?p=${id}` }
              sessionStorage.setItem('ITEM_SELECT', JSON.stringify({
                tipo: obj.principal, menu: obj.seccion,
              }));
              break
            case 'DETALLES':
              obj = { principal: seccion.length === 0 ? `dashboard/AgendarCitas?p=${id}` : seccion, seccion: `ConsultarIncidencia?p=${id}` }
              sessionStorage.setItem('ITEM_SELECT', JSON.stringify({
                tipo: obj.principal, menu: obj.seccion,
              }));
              break
            default:
              setOpen(false);
              obj = { principal: seccion.length === 0 ? `ModuloNotificaciones/ConsultaNotificaciones` : `ModuloNotificaciones/ConsultaNotificaciones`, seccion: `ModuloNotificaciones/ConsultaNotificaciones` }
              sessionStorage.setItem('ITEM_SELECT', JSON.stringify({
                tipo: 'ConsultaNotificaciones', menu: 'ModuloNotificaciones',
              }));

          }
        })()
      }

      //Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
      const urls = seccion.length === 0 ? `dashboard/${obj.principal}/` + seccion + '' + obj.principal : '/' + seccion + '/' + obj.principal
      setitemsMenuPrincipal(obj.seccion)
      return window.location.hash = urls;
    }
  };

  const toggleModal = (id, opciones) => {

    sessionStorage.setItem('OPTIONS', opciones)
    const menuitems = window.location.hash.split('#/')[1];
    const [seccion] = menuitems?.split('/');
    console.log(menuitems)
    const obj = {
      principal: seccion.length === 0 ? `dashboard/ModuloNotificaciones/ConsultaNotificaciones?p=${id}` : seccion, seccion: `ConsultaNotificaciones?p=${id}`,
      tipoAnterior: 'dashboard/',
      menuAnterior: 'dashboard/'
    }
    const urls = seccion.length === 0 ? `dashboard/${obj.principal}/` + seccion + '' + obj.principal : '/' + seccion + '/' + obj.principal
    setitemsMenuPrincipal(seccion)
    setOpen(!open);

    return window.location.hash = urls;
  }
  let permiso = sessionStorage.getItem('PERMISO');
  const localPermiso = JSON.parse(permiso);
  const obj = {
    open,
    toggleSignUp,
    toggleModal,
    localPermiso,
    validated,
    key: row.cells[0].value,
    row: row.cells[0].value,
  }
  return (
    <React.Fragment>
      <BtnSeccionAction obj={obj}>
        <OpcionsForm />
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
  const columns = [
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
                                          columns={columns}
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
                                  </>);
                              case 1:
                                return (
                                  <Row>
                                    <Col sm="12">
                                    {agendada?.length > 0 && <Table
                                          columns={columns}
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