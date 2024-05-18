/* eslint-disable default-case */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import FormAdd from './Componentes/FormAdd';
import FormUpdate from './Componentes/FormUpdate';
import Solicitudes from './Componentes/Solicitudes';
import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';
import Swal from 'sweetalert2';
import Table from '../../components/Table';
import { useActas } from '../../../../hooks/useActas';
import BtnActas from './Componentes/BtnActas';
import FieldAsistencia from './Componentes/FieldAsistencia';
import RegistrarActas from '../AdministradorActas/RegistrarActas';




const ActionColumn = ({ row }) => {
  const {
    eliminar,
    validated,
    setOpen,
    setItemsUpdate,
    setSignUpModalAdd,
    open, setOpcion,
    setOpcionBusqueda,
    setObjActas
  } = useContext(DashboardContext);




  const toggleSignUp = (id) => {
    const objActas = {
      id      : row.cells[0].row.values.idActa,
      fecha      : row.cells[0].row.values.fecha,
      horaFinal  : row.cells[0].row.values.horaFinal,
      horaInicial: row.cells[0].row.values.horaInicial,
      idActa     : row.cells[0].row.values.idActa,
      nombre     : row.cells[0].row.values.nombre,
     }

    let permiso = sessionStorage.getItem('PERMISO');
    const localPermiso = JSON.parse(permiso);
    if (localPermiso?.update === 'S') {

      if (row.cells[0].row.values.idActa === id)

      setItemsUpdate(id);
      setOpen(!open);
      setSignUpModalAdd(true);
      setOpcion('update');
      setObjActas(objActas);

    } else {
      Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
    }
  };

  const listarEstudiante = (id,titulo) => {
    const objActas = {
      id      : row.cells[0].row.values.idActa,
      fecha      : row.cells[0].row.values.fecha,
      horaFinal  : row.cells[0].row.values.horaFinal,
      horaInicial: row.cells[0].row.values.horaInicial,
      idActa     : row.cells[0].row.values.idActa,
      nombre     : row.cells[0].row.values.nombre,
     }

    let permiso = sessionStorage.getItem('PERMISO');
    const localPermiso = JSON.parse(permiso);
    if (localPermiso?.update === 'S') {
      if (row.cells[0].row.values.idActa === id) {
      setItemsUpdate(id);
      setOpen(!open);
      setSignUpModalAdd(true);
      setOpcion('solicitudes');
      setOpcionBusqueda(titulo);
      setObjActas(objActas);

      }

     } else {
      Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
    }

   };
   const registrarAsistentes = (id,titulo) => {
    const objActas = {
      id      : row.cells[0].row.values.idActa,
      fecha      : row.cells[0].row.values.fecha,
      horaFinal  : row.cells[0].row.values.horaFinal,
      horaInicial: row.cells[0].row.values.horaInicial,
      idActa     : row.cells[0].row.values.idActa,
      nombre     : row.cells[0].row.values.nombre,
     }
    let permiso = sessionStorage.getItem('PERMISO');
    const localPermiso = JSON.parse(permiso);
    if (localPermiso?.update === 'S') {
      if (row.cells[0].row.values.idActa === id) {
      setItemsUpdate(id);
      setOpen(!open);
      setSignUpModalAdd(true);
      setOpcion('Asistentes');
      setOpcionBusqueda(titulo);
      setObjActas(objActas);
      }

     } else {
      Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
    }

   };
  let permiso = sessionStorage.getItem('PERMISO');
  const localPermiso = JSON.parse(permiso);
  const isbtnLink = 'S';
  const obj = {
    open,
    toggleSignUp,
    listarEstudiante,
    registrarAsistentes,
    localPermiso,
    validated,
    key: row.cells[0].value,
    row: row.cells[0].value,
    eliminar,
    isbtnLink,
  }
  return (
    <React.Fragment>
      <BtnActas obj={obj}>
      </BtnActas>
    </React.Fragment>
  );
};
const Actas = (props) => {
  const {
    objActas,setOpcion, opcion, itemsUpdate,opcionBusqueda
  } = useContext(DashboardContext);

  const permisos = props?.permisos || {};
  const {
    validated,
    signUpModalAdd, setSignUpModalAdd,
    sizePerPageList,objDatosAprendiz
  } = useContext(DashboardContext);
  const { itemsActas, query } = useActas()

  const datos = itemsActas?.data || [];
  const [mensajeModal,setMensageModal] = useState('');

  const handleClose = (e) => {
    setSignUpModalAdd(false);
    query('ModuloActas', 'actas', [{ opcion: btoa('listActas'), obj: 'actas' }]);
  }
  const columns = [
    {
      Header: 'idActa',
      accessor: 'idActa',
      sort: true,
    },
    {
      Header: 'Nombres',
      accessor: 'nombre',
      sort: true,
    },
    {
      Header: 'Fecha',
      accessor: 'fecha',
      sort: true,
    }
    , {
      Header: 'Hora Inicial',
      accessor: 'horaInicial',
      sort: false,
    },

    {
      Header: 'Hora Final',
      accessor: 'horaFinal',
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
  const toggleSignUp = () => {
    setOpcion('add');
    { permisos?.add === 'S' ? setSignUpModalAdd(!signUpModalAdd) : Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION') }

  };

  useEffect(() => {
    query('ModuloActas', 'actas', [{ opcion: btoa('listActas'), obj: 'actas' }]);
  }, [query]);

  useEffect(() => {
    {(() => {
      switch (opcion) {
        case 'update':
          setMensageModal('Formulario para Actualizar Actas');
          break

        case 'add':
          setMensageModal('Formulario para Registrar Actas');
          break

         case 'solicitudes':
          setMensageModal('Formulario para Asignar Solicitudes');
          break
          case 'Asistentes':
            setMensageModal('Formulario para Asignar Asistentes');
            break
            case 'Actas':
              setMensageModal('Formulario para Registrar Actas');
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
                      <Modal show={signUpModalAdd} onHide={setSignUpModalAdd} onClose={handleClose} size={'lg'}>
                        <Modal.Header>
                        <Row>
                          <Col sm={11}>
                          <Row>
                           <div className="editTitulos">{mensajeModal}</div>
                          </Row>
                          <Row>
                          <div className="headerActas">
                           <div className="flexRowContent--header_actas___grid__col_1">
                           <div className="mb-1"><small className="header_actas_titulos">{'NOMBRE DEL COMITÉ O DE LA REUNIÓN:  '}</small>{objActas.nombre ? objActas.nombre:''}</div>
                            </div>
                            <div className="flexRowContent--header_actas___grid__col_3">
                           <div className="mb-1"><small className="header_actas_titulos">{'CIUDAD Y FECHA:'}</small><br/>{'Bucaramanga,'}{objActas.fecha ? objActas.fecha:''}</div>
                           <div className="mb-1"><small className="header_actas_titulos">{'HORA INICIO:'}</small><br/>{objActas.horaInicial? objActas.horaInicial:''}</div>
                           <div className="mb-1"><small className="header_actas_titulos">{'HORA FIN:'}</small><br/>{objActas.horaFinal? objActas.horaFinal:''}</div>
                           </div>
                           <div className="flexRowContent--header_actas___grid__col_2">
                           <div className="mb-1"><small className="header_actas_titulos">{'LUGAR Y/O ENLACE:'}</small><br/>{'Centro de Servicios Empresariales y Turísticos, Auditorio Polivalente'}</div>
                           <div className="mb-1"><small className="header_actas_titulos">{'DIRECCIÓN GENERAL / REGIONAL / CENTRO'}</small><br/>{'Centro de Servicios Empresariales y Turísticos'}</div>
                           </div>
                            </div>
                          </Row>
                          {opcion ==='Actas' ?
                          <Row>
                            <div className="headerActas_datos_estudiantes">
                            <div className="flexRowContent--header_actas___grid__col_1">
                           <div className="mb-1"><small className="header_actas_titulos">{'APRENDIZ:'}      </small>{objDatosAprendiz.nombres}{' '}{objDatosAprendiz.apellidos}</div>
                           </div>
                           <div className="flexRowContent--header_actas___grid__col_3">
                           <div className="mb-1"><small className="header_actas_titulos">{'TIPO DOCUMENTO:'}</small><br/>{objDatosAprendiz.tipoIdentificacion}</div>
                           <div className="mb-1"><small className="header_actas_titulos">{'No. DOCUMENTO IDENTIDAD:'}</small><br/>{objDatosAprendiz.identificacion}</div>
                           <div className="mb-1"><small className="header_actas_titulos">{'ESPECIALIDAD'}</small><br/>{objDatosAprendiz.proyectoFormativo}</div>
                           </div>
                            </div>
                            <div className="headerActas_datos_estudiantes">
                           <div className="flexRowContent--header_actas___grid__col_3">
                           <div className="mb-1"><small className="header_actas_titulos">{'FICHA:'}</small><br/>{objDatosAprendiz.ficha? objDatosAprendiz.ficha: '00000'+objDatosAprendiz.id}</div>
                           <div className="mb-1"><small className="header_actas_titulos">{'EMAIL'}</small><br/>{objDatosAprendiz.correo}</div>
                           <div className="mb-1"><small className="header_actas_titulos">{'PROGRAMA'}</small><br/>{objDatosAprendiz.programaFormacion}</div>
                           </div>
                            </div>
                          </Row>
                          :''}
                          </Col>
                          <Col sm={1}>
                           <Button
                            variant="success"
                            type="submit"
                            className="btnCerrar"
                            style={{ marginLeft: '1em',marginTop: '0em', width:'0.5em',height:'1.5em'}}
                            onClick={handleClose}><div style={{ marginLeft: '-0.4em',marginTop: '-0.5em'}}>X</div> </Button>
                            </Col>
                        </Row>
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
                                     case 'solicitudes':
                                      window.location.hash = `#/dashboard/ModuloActas/Actas?p=${itemsUpdate}`;
                                     return <React.Fragment>
                                         <Solicitudes
                                         opcionBusqueda={opcionBusqueda}
                                           title={`Asignar ${props?.tipo?.toUpperCase()}`}
                                           validated={validated}
                                         />
                                       </React.Fragment>
                                   case 'Actas':
                                    window.location.hash = `#/dashboard/ModuloActas/Actas?p=${itemsUpdate}`;
                                   return <React.Fragment>
                                       <RegistrarActas
                                          accion={'ModuloActas'}
                                          tipo={props?.tipo}
                                          permisos={permisos}
                                        />
                                     </React.Fragment>
                                    case 'Asistentes':
                                      window.location.hash = `#/dashboard/ModuloActas/Actas?p=${itemsUpdate}`;
                                     return <React.Fragment>
                                       <FieldAsistencia
                                          accion={'ModuloActas'}
                                          tipo={props?.tipo}
                                          permisos={permisos}
                                          idActa={itemsUpdate}
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
                      <i className="mdi mdi-account-plus" > Agregar Acta</i>
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
                  titulo={'LISTADO DE ACTAS REGISTRADAS'}
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

export default Actas;
