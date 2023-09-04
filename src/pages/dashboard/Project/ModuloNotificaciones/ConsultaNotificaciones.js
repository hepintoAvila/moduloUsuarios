/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card,  } from 'react-bootstrap';
//import Swal from 'sweetalert2';

 
import Table from '../../../../components/Table';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import { useAdminUsuarios } from '../../../../hooks/useAdminUsuarios';
import BtnSeccionAction from './Components/BtnSeccionAction';
import OpcionsForm from './Form/OpcionsForm';
 
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
                    tipoAnterior:'dashboard/',
                    menuAnterior:'dashboard/'}));
                  break
            case 'ACTAS':
                  obj = {principal:seccion.length===0 ? `dashboard/RegistrarActa?p=${id}`:seccion, seccion: `RegistrarActa?p=${id}`}
                  sessionStorage.setItem('ITEM_SELECT', JSON.stringify({ tipo: obj.principal, menu: obj.seccion,
                    tipoAnterior:'dashboard/',
                    menuAnterior:'dashboard/'}));
                  break
            case 'DETALLES':
                  obj = {principal:seccion.length===0 ? `dashboard/AgendarCitas?p=${id}`:seccion, seccion: `ConsultarIncidencia?p=${id}`}
                  sessionStorage.setItem('ITEM_SELECT', JSON.stringify({ tipo: obj.principal, menu: obj.seccion,
                    tipoAnterior:'dashboard/',
                    menuAnterior:'dashboard/'  }));
                  break
            default:
                setOpen(false);
                obj = {principal:seccion.length===0 ? `ModuloNotificaciones/ConsultaNotificaciones`:`ModuloNotificaciones/ConsultaNotificaciones`, seccion: `ModuloNotificaciones/ConsultaNotificaciones`}
                sessionStorage.setItem('ITEM_SELECT', JSON.stringify({ tipo:'ConsultaNotificaciones', menu: 'ModuloNotificaciones',
                tipoAnterior:'dashboard/',
                menuAnterior:'dashboard/' }));
                                  
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
  //const permisos = props.permisos || {};

  const {itemsAgendarCitas,query} = useAdminUsuarios()
  const {
    sizePerPageList
  } = useContext(DashboardContext);
  const datos = itemsAgendarCitas?.AgendarCitas|| [{}];
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'codigo',
      accessor: 'codigo',
      sort: true,
    },
    {
      Header: 'Instructor',
      accessor: 'instructor',
      sort: true,
    }
    , {
      Header: 'Aprendiz',
      accessor: 'aprendiz',
      sort: false,
    }, {
      Header: 'Fecha Incidente',
      accessor: 'fechaIncidente',
      sort: false,
    }, {
      Header: 'Fecha Agendada',
      accessor: 'fechaAgendada',
      sort: false,
    }, {
      Header: 'Tipo Atencion',
      accessor: 'tipoAtencion',
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
    query('ModuloNotificaciones', 'agendarCitas', [{ opcion: 'consultar', obj: 'agendarCitas' }]);
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