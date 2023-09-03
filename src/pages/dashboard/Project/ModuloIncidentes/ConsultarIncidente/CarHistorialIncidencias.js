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
import BtnSeccionAction from '../Components/BtnSeccionAction';
 
const ActionColumn = ({ row }) => {

  const {
    eliminar,
    validated,
    toggle,
    setOpen,
    setItemsUpdate,
    open, 
    setitemsMenuPrincipal,setitemsUrl
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
      //Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
      const url =`dashboard/ModuloIncidentes/ConsultarIncidencia?id=${id}`
      sessionStorage.setItem('ITEM_SELECT', JSON.stringify({ tipo: 'ConsultarIncidencia', menu: 'ModuloIncidentes' }));
      setitemsMenuPrincipal('ModuloIncidentes');
      setitemsUrl('ConsultarIncidencia');
      setOpen(!open);
    return window.location.hash = url;
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
      <BtnSeccionAction obj={obj}> 
      <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-3">Conceptos</h4>
                            <p className="text-muted font-14 mb-3">
                            Hechos constitutivos de la presunta falta: El aprendiz se ausentó 4 días de los 5 días programados para la formación transversal correspondiente a la Competencia: Promover la interacción idónea consigo mismo, con los demás y con la naturaleza en los contextos laboral y social y RAPS: Asumir responsablemente los criterios de preservación y conservación del Medio Ambiente y de Desarrollo Sostenible, en el ejercicio de su desempeño laboral y social; cuyos motivos manifestados por el aprendiz sin presentar pruebas que soporten lo expresado, están registrados en el aplicativo Sofia Plus.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>   
      </BtnSeccionAction>
    </React.Fragment>
  );
};
const CarHistorialIncidencias = (props) => {
  //const permisos = props.permisos || {};

  const {itemsHistorial,query} = useAdminUsuarios()

  const {
    sizePerPageList
  } = useContext(DashboardContext);
  const datos = itemsHistorial?.Historial|| [{}];
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Tipo de Incidencia',
      accessor: 'gravedad',
      sort: true,
    },
    {
      Header: 'Estado',
      accessor: 'estado',
      sort: true,
    }
    , {
      Header: 'Fecha Incidencia',
      accessor: 'fechaIncidente',
      sort: false,
    }, {
      Header: 'Actas',
      accessor: 'actas',
      sort: false,
    },
    {
        Header: 'Incidencia',
        accessor: 'tipoIncidencia',
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
    query('ModuloHistorial', 'historial', [{ opcion: 'consultar', obj: 'historial' }]);
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

export default CarHistorialIncidencias;