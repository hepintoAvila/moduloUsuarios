/* eslint-disable default-case */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';

import Swal from 'sweetalert2';

import { useAprendiz } from '../../../../../hooks/useAprendiz';

import Table from '../../../components/Table';
import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';
import FormSanciones from './FormSanciones';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
//import BtnActualizarAprendiz from '../../../components/BtnActualizarAprendiz/BtnActualizarAprendiz';
/*
const ActionColumn = ({ row }) => {
  const {
    eliminar,
    validated,
    setOpen,
    setItemsUpdate,
    setSignUpModalAdd,
    open, setOpcion
  } = useContext(DashboardContext);




  const toggleSignUp = (id) => {

    let permiso = sessionStorage.getItem('PERMISO');
    const localPermiso = JSON.parse(permiso);
    if (localPermiso?.update === 'S') {

      if (row.cells[0].row.values.idAprendiz === id)

        setItemsUpdate(id);
      setOpen(!open);
      setSignUpModalAdd(true);
      setOpcion('update');

    } else {
      Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
    }
  };

  const toggleSanciones = (id) => {

    let permiso = sessionStorage.getItem('PERMISO');
    const localPermiso = JSON.parse(permiso);
    if (localPermiso?.update === 'S') {

      if (row.cells[0].row.values.idAprendiz === id)

        setItemsUpdate(id);
      setOpen(!open);
      setSignUpModalAdd(true);
      setOpcion('sanciones');

    } else {
      Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
    }

   };

  let permiso = sessionStorage.getItem('PERMISO');
  const localPermiso = JSON.parse(permiso);
  const obj = {
    open,
    toggleSignUp,
    toggleSanciones,
    localPermiso,
    validated,
    key: row.cells[0].value,
    row: row.cells[0].value,
    eliminar,
  }
  return (
    <React.Fragment>
      <BtnActualizarAprendiz obj={obj}>

      </BtnActualizarAprendiz>
    </React.Fragment>
  );
};
*/
const Aprendiz = (props) => {
  const {
    setOpcion, opcion, itemsUpdate
  } = useContext(DashboardContext);

  const permisos = props?.permisos || {};
  const {
    validated,
    signUpModalAdd, setSignUpModalAdd,
    sizePerPageList,
  } = useContext(DashboardContext);
  const { itemsAprendiz, queryAprendiz } = useAprendiz()
  const datos = itemsAprendiz?.data || [];
  const [mensajeModal,setMensageModal] = useState('');
  const handleClose = (e) => {
    setSignUpModalAdd(false);
    queryAprendiz('ModuloAprendiz', 'aprendiz', [{ opcion: btoa('listaAprendiz'), obj: 'aprendiz' }]);
  }
  const columns = [
    {
      Header: 'idAprendiz',
      accessor: 'idAprendiz',
      sort: true,
    },
    {
      Header: 'Nombres',
      accessor: 'nombres',
      sort: true,
    },
    {
      Header: 'Apellidos',
      accessor: 'apellidos',
      sort: true,
    }
    , {
      Header: 'Identificación',
      accessor: 'tipoIdentificacion',
      sort: false,
    },

    {
      Header: 'Telefono',
      accessor: 'telefono',
      sort: false,
    },
    {
      Header: 'Correo',
      accessor: 'correo',
      sort: false,
    },
  ];
  const toggleSignUp = () => {
    setOpcion('add');
    { permisos?.add === 'S' ? setSignUpModalAdd(!signUpModalAdd) : Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION') }

  };

  useEffect(() => {
    queryAprendiz('ModuloAprendiz', 'aprendiz', [{ opcion: btoa('listaAprendiz'), obj: 'aprendiz' }]);
  }, [queryAprendiz]);

  useEffect(() => {
    {(() => {
      switch (opcion) {
        case 'update':
          setMensageModal('Formulario Para Actualizar Aprendiz');
          break

        case 'add':
          setMensageModal('Formulario Para Registrar Aprendiz');
          break

         case 'sanciones':
          setMensageModal('Formulario Para Registrar Sanciones Aprendiz');
          break
      }
    })()
  }
  }, [opcion]);

  return (
    <>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col sm={12} className={`${signUpModalAdd ? '' : 'd-lg-none'}`}>
                  <Card>
                    <Card.Body>
                      {/* Sign up Modal */}
                      <Modal show={signUpModalAdd} onHide={setSignUpModalAdd} onClose={handleClose}>
                        <Modal.Header>
                          <div className="center-text-titulo">
                            <Modal.Title>
                              {mensajeModal}
                              </Modal.Title>
                          </div>

                          <Button
                            variant="success"
                            type="submit"
                            className="btnCerrar"
                            onClick={handleClose}>X</Button>

                        </Modal.Header>


                        <Modal.Body>
                            {(() => {
                              switch (opcion) {
                                case 'update':

                                return <React.Fragment>
                                    <FormUpdate
                                      idAprendiz={itemsUpdate}
                                      title={`FORMULARIO PARA LA EDICION DE ${props?.tipo?.toUpperCase()}`}
                                      validated={validated}
                                    />
                                  </React.Fragment>

                                case 'add':

                                return <React.Fragment>
                                    <FormAdd
                                      title={`REGISTRAR ${props?.tipo?.toUpperCase()}`}
                                      validated={validated}
                                    />
                                  </React.Fragment>
                                     case 'sanciones':
                                     return <React.Fragment>
                                         <FormSanciones
                                           title={`REGISTRAR Sanciones ${props?.tipo?.toUpperCase()}`}
                                           validated={validated}
                                         />
                                       </React.Fragment>
                                default:

                                  return (
                                    <React.Fragment>
                                      {''}
                                      </React.Fragment>
                                  );
                              }
                            })()
                          }
                        </Modal.Body>

                      </Modal>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                </Col>
                <Col sm={8}>
                  <div className="text-sm-end">
                    <Button className="btn btn-success mb-2 me-1" onClick={toggleSignUp}>
                      <i className="mdi mdi-account-plus" > Agregar Aprendiz</i>
                    </Button>
                  </div>
                </Col>
              </Row>
              {datos?.length > 0 ?

                <Table
                  columns={columns}
                  data={datos}
                  pageSize={25}
                  sizePerPageList={sizePerPageList}
                  isSortable={true}
                  pagination={true}
                  theadClass="table-light"
                  searchBoxClass="mt-0 mb-2"
                  isSearchable={true}
                  isVisible={true}
                  nametable={props.accion}
                  titulo={'LISTADO DE APRENDIZES REGISTRADOS'}
                  permisos={permisos}
                  icons={'dripicons-user'}
                />
                : <PermisoAlert />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Aprendiz;
