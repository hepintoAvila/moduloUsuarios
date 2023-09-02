/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card,  } from 'react-bootstrap';
import Swal from 'sweetalert2';

import BtnSeccionAction from './BtnSeccionAction';
import Table from '../../../../components/Table';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import { useAdminUsuarios } from '../../../../hooks/useAdminUsuarios';
 
const ActionColumn = ({ row }) => {

  const {
    eliminar,
    validated,
    toggle,
    setOpen,
    setItemsUpdate,
    open, 
    setitemsMenuPrincipal
  } = useContext(DashboardContext);

   const toggleSignUp = (id) => {
    let permiso = sessionStorage.getItem('PERMISO');
    const localPermiso = JSON.parse(permiso);
    if (localPermiso?.update === 'N') {

      if(row.cells[0].row.values.id===id)
      setItemsUpdate(row?.cells[0]?.row?.values)
      setOpen(open);
      toggle()
    } else {
      Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
      const url =`AgendarCitas?idIncidencia=${id}`
      const menuitems = window.location.hash.split('#/')[1];
      const [seccion] = menuitems?.split('/');
      const obj = {principal:seccion.length===0 ? `dashboard/${url}`:seccion, seccion: url}
      sessionStorage.setItem('ITEM_SELECT', JSON.stringify({ tipo: obj.principal, menu: obj.seccion }));
     // setLoading(true)
    const urls = seccion.length===0 ? `dashboard/${url}/`+seccion+''+url:'/'+seccion+'/'+url
    console.log('urls',urls);
    setitemsMenuPrincipal(url)
    return window.location.hash = urls;
    }
  };

  let permiso = sessionStorage.getItem('PERMISO');
  const localPermiso = JSON.parse(permiso);
  const obj = {
    open,
    toggleSignUp,
    localPermiso,
    validated,
    key:row.cells[0].value,
    row:row.cells[0].value,
    eliminar,
  }
  return (
    <React.Fragment>
      <BtnSeccionAction obj={obj}></BtnSeccionAction>
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