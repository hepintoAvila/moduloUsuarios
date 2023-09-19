/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card,  } from 'react-bootstrap';
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

   const toggleSignUp = (id,opciones) => {
    
    let permiso = sessionStorage.getItem('PERMISO');
    const localPermiso = JSON.parse(permiso);
    if (localPermiso?.update === 'N') {

      if(row.cells[0].row.values.id===id)
      setItemsUpdate(row?.cells[0]?.row?.values)
      //toggle()
    } else {
      sessionStorage.removeItem('OPTIONS')
      
      const menuitems = window.location.hash.split('#/')[1];
      const [seccion] = menuitems?.split('/');
      let obj={}
      {(() => {
        switch (sessionStorage.getItem('OPTIONS')) {
            case 'AGENDAR':
                  obj = {principal:seccion.length===0 ? `dashboard/AgendarCitas?p=${id}`:seccion, seccion: `AgendarCitas?p=${id}`}
                  sessionStorage.setItem('ITEM_SELECT', JSON.stringify({ tipo: obj.principal, menu: obj.seccion,
                  }));
                  break
            case 'ACTAS':
                  obj = {principal:seccion.length===0 ? `dashboard/RegistrarActa?p=${id}`:seccion, seccion: `RegistrarActa?p=${id}`}
                  sessionStorage.setItem('ITEM_SELECT', JSON.stringify({ tipo: obj.principal, menu: obj.seccion,
                  }));
                  break
            case 'DETALLES':
                  obj = {principal:seccion.length===0 ? `dashboard/AgendarCitas?p=${id}`:seccion, seccion: `ConsultarIncidencia?p=${id}`}
                  sessionStorage.setItem('ITEM_SELECT', JSON.stringify({ tipo: obj.principal, menu: obj.seccion,
                  }));
                  break
            default:
                setOpen(false);
                obj = {principal:seccion.length===0 ? `ModuloNotificaciones/ConsultaNotificaciones`:`ModuloNotificaciones/ConsultaNotificaciones`, seccion: `ModuloNotificaciones/ConsultaNotificaciones`}
                sessionStorage.setItem('ITEM_SELECT', JSON.stringify({ tipo:'ConsultaNotificaciones', menu: 'ModuloNotificaciones',
                }));
                                  
        }
    })()
    }

    //Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
    const urls = seccion.length===0 ? `dashboard/${obj.principal}/`+seccion+''+obj.principal:'/'+seccion+'/'+obj.principal
    setitemsMenuPrincipal(obj.seccion)
    return window.location.hash = urls;
    }
  };

  const toggleModal= (id,opciones) => {
   
    sessionStorage.setItem('OPTIONS',opciones)
    const menuitems = window.location.hash.split('#/')[1];
    const [seccion] = menuitems?.split('/');
    console.log(menuitems)
    const obj = { principal: seccion.length === 0 ? `dashboard/ModuloNotificaciones/ConsultaNotificaciones?p=${id}` : seccion, seccion: `ConsultaNotificaciones?p=${id}`,
    tipoAnterior:'dashboard/',
    menuAnterior:'dashboard/'  }  
    const urls = seccion.length===0 ? `dashboard/${obj.principal}/`+seccion+''+obj.principal:'/'+seccion+'/'+obj.principal
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
    key:row.cells[0].value,
    row:row.cells[0].value,
  }
  return (
    <React.Fragment>
      <BtnSeccionAction obj={obj}>
        <OpcionsForm/>
      </BtnSeccionAction>
    </React.Fragment>
  );
};
const ConsultaNotificaciones = (props) => {
 
  const {itemsSolicitudes,query} = useContext(NotificacionesContext)
  const {
    sizePerPageList
  } = useContext(DashboardContext);
  const datos = itemsSolicitudes?.data?.Solicitudes|| [{}];
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
      Cell: ActionColumn,
    },
  ];

  useEffect(() => {
    query('ModuloSolicitudComite', 'EnviarSolicitud', [{ opcion: encodeBasicUrl('ConsultarSolicitud'), obj: 'ConsultarSolicitud',sw:'1' }]);
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
                    titleTable={'LISTADO DE NOTIFICACIONES'}
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

export default ConsultaNotificaciones;