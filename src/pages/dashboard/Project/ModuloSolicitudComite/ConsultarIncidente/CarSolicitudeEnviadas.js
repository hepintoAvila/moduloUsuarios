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
 
 
const ActionColumn = ({ row }) => {
  const { setCodigoFicha, setModal } = useContext(NotificacionesContext)

  const toggleSignUp = (codigoFicha, titulo) => {

    if (row?.cells[1]?.row?.values?.codigoFicha === codigoFicha) {
      setCodigoFicha({ codigoFicha: codigoFicha, titulo: titulo })
      setModal(true);
      //Swal.fire(`ESTA EN ESPERA DEL CONCEPTO...${codigoFicha}`);
    } else {
      Swal.fire(`ESTA EN ESPERA DEL CONCEPTO...${row?.cells[1]?.row?.values?.codigoFicha}-${titulo}`);
    }  
  };

  const obj = {
    toggleSignUp,
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
  const {codigoFicha,modal} = useContext(NotificacionesContext)

 
  const datos = props?.Solicitudes|| [];

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },{
      Header: 'CODIGO',
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
    }, {
      Header: 'Actas',
      accessor: 'actas',
      sort: false,
    },
    {
        Header: 'Tipo',
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
      <Modal show={modal}  fullscreen={true} >
        <Modal.Body> 
        <ViewPdf codigoFicha={codigoFicha?.codigoFicha} titulo={codigoFicha?.titulo}/> 
        </Modal.Body>
      </Modal>
      </Row>
    </>
  );
};

export default CarSolicitudeEnviadas;