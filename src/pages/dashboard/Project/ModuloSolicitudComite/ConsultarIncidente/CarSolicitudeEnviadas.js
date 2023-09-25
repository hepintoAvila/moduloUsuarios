/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext} from 'react';
import { Row, Col, Card, Modal,  } from 'react-bootstrap';
import Swal from 'sweetalert2';

 
import Table from '../../../../../components/Table';

 import ViewPdf from '../Components/ViewPdf';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import BtnSeccionPdf from '../../../../../components/BtnSeccionPdf';
import FormEditarSolicitud from '../EnviarSolicitud/FormEditarSolicitud';
 
const ActionColumn = ({ row }) => {
  const { setCodigoFicha, setModal,getData } = useContext(NotificacionesContext)

  const toggleSignUp = (codigoFicha, titulo) => {

    if (row?.cells[1]?.row?.values?.codigoFicha === codigoFicha) {
      setCodigoFicha({ codigoFicha: codigoFicha, titulo: titulo })
      setModal(true);
      //Swal.fire(`ESTA EN ESPERA DEL CONCEPTO...${codigoFicha}`);
    } else {
      Swal.fire(`ESTA EN ESPERA DEL CONCEPTO...${row?.cells[1]?.row?.values?.codigoFicha}-${titulo}`);
    }  
  };

  const EditDelete = (codigoFicha, titulo) => {

    if (row?.cells[1]?.row?.values?.codigoFicha === codigoFicha) {
      
      if(titulo==='DELETE'){
        const id = row?.cells[0]?.row?.values?.id
        
        Swal.fire({
            title: 'Desea eliminar el registro? ' + id,
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
             const datosEvent = {
                idSolicitud:id,
                accion: 'ModuloSolicitudComite',
                opcion: 'deleteSolicitud',
                tipo: 'deleteSolicitud',
               }
                  const queryDatos = datosEvent
                  ? Object.keys(datosEvent)
                      .map((key) => key + '=' + btoa(datosEvent[key]))
                      .join('&')
                  : '';
                  Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Enviado Solicitud...',
                    showConfirmButton: false,
                    timer: 1500
                  })                  
                  setTimeout(function () {
                    getData(queryDatos)
                  }, 2000);
            }
          });
      }

   
    } else {
      Swal.fire(`ESTA EN ESPERA DEL CONCEPTO...${row?.cells[1]?.row?.values?.codigoFicha}-${titulo}`);
    }  
  };
  const obj = {
    toggleSignUp,
    EditDelete,
    codigoFicha:row?.cells[1]?.row?.values?.codigoFicha,
    key:row.cells[0].value,
    row:row.cells[0].value,
  }
  return (
    <React.Fragment>
      <BtnSeccionPdf obj={obj}> 
      </BtnSeccionPdf>
    </React.Fragment>
  );
};
const CarSolicitudeEnviadas = (props) => {
  //const permisos = props.permisos || {};
  const {codigoFicha,modal,setModal} = useContext(NotificacionesContext)

 
  const datos = props?.Solicitudes|| [];

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },{
      Header: 'Código',
      accessor: 'codigoFicha',
      sort: true,
    },
    {
      Header: 'Aprendiz',
      accessor: 'aprendiz',
      sort: true,
    },
    {
      Header: 'Estado',
      accessor: 'estado',
      sort: true,
    }
    , {
      Header: 'Fecha Incidencia',
      accessor: 'fechaHora',
      sort: false,
    },
    {
      Header: 'Fecha Agendada',
      accessor: 'fechaHoraAgendada',
      sort: false,
    },
    {
        Header: 'Calificación',
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
  const onClose = () => {
    setModal(false);
};
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
                    sizePerPageList={props.sizePerPageList}
                    isSortable={true}
                    pagination={true}
                    theadClass="table-light"
                    searchBoxClass="mt-2 mb-3"
                    isSearchable={true}
                    nametable={props.accion}
                    titleTable={'HISTORIAL DE INCIDENCIAS'}
              />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Modal show={modal} fullscreen={codigoFicha?.titulo==='EDITAR'? false:true} onHide={onClose} >
          <Modal.Body>
          <Modal.Header onClick={onClose}>
                    <h4 className="modal-description">Formulario {codigoFicha?.titulo}</h4>
                  </Modal.Header>
            {(() => {
              switch (codigoFicha?.titulo) {
                case 'EVIDENCIAS':
                case 'FORMATO':
                  return (<><ViewPdf codigoFicha={codigoFicha?.codigoFicha} titulo={codigoFicha?.titulo} /> </>)
                  
                case 'EDITAR':
                  return (<><FormEditarSolicitud /> </>)
                default:
                  return (<>{''}</>)
              }
            })()}
          </Modal.Body>
        </Modal>
      </Row>
    </>
  );
};

export default CarSolicitudeEnviadas;