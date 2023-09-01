import { Modal, Pagination, Row } from "react-bootstrap";

import React from "react";
import BtnActions from "./BtnActions";
import BtnLink from "./BtnLink";


const BtnSeccionAction = (props,children) => {

  const isbtnLink = props?.obj?.isbtnLink|| 'N';
  const tipo = props?.obj?.tipo || '';
  const descripcionbtnLink = props?.obj?.descripcionbtnLink || '';
  const descripcionbtnaction = props?.obj?.descripcionbtnaction || '';
  const titulobtnLink =props?.obj?.titulobtnLink || '';
  const urlbtnLink =props?.obj?.urlbtnLink || '';

  return (
    <React.Fragment>
      <Modal show={props?.obj?.open} onHide={props?.obj?.toggleSignUp}>
        <Modal.Body>{props?.children ? props?.children : null}
        </Modal.Body>
      </Modal>
      <Row>
        <Pagination className="pagination-rounded mx-auto" size="sm">
          <Pagination.Item>

                <BtnActions
                 url={`/dashboard/ModuloNotificaciones/AgendarCitas?p=${props?.obj?.row}`}
                  permisos={'N'}
                  key={`EDITAR_${props?.obj?.key}`}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'EDITAR'}
                  descripcion={`Editar ${descripcionbtnaction}`}
                  icon={'mdi mdi-calendar-plus'}
                />
          </Pagination.Item>
          <Pagination.Item>
                <BtnActions
                 url={`/dashboard/ConsultaEvidencias/${tipo}?id=${props?.obj?.row}`}
                  permisos={'N'}
                  key={`ACTAS_${props?.obj?.key}`}
                  toggleActions={props?.obj?.eliminar}
                  row={props?.obj?.row}
                  titulo={'ACTAS'}
                  descripcion={`aCTAS ${descripcionbtnaction}`}
                  icon={'mdi mdi-layers'}

                /> 
          </Pagination.Item>         
          <Pagination.Item>

                <BtnActions
                 url={`/dashboard/RegistrarActa/${tipo}?id=${props?.obj?.row}`}
                  permisos={'N'}
                  key={`ELIMINAR_${props?.obj?.key}`}
                  toggleActions={props?.obj?.eliminar}
                  row={props?.obj?.row}
                  titulo={'ELIMINAR'}
                  descripcion={`Eliminar ${descripcionbtnaction}`}
                  icon={'mdi mdi-layers-search-outline'}

                /> 
          </Pagination.Item>

      </Pagination>
      </Row>
    </React.Fragment>
  );
}
export default BtnSeccionAction;
