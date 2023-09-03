import { Modal, Pagination, Row } from "react-bootstrap";

import React from "react";
import BtnActions from "./BtnActions";

const BtnSeccionAction = (props,children) => {

  const tipo = props?.obj?.tipo || '';

  const descripcionbtnaction = props?.obj?.descripcionbtnaction || '';

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
                  key={`AGENDAR${props?.obj?.key}`}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'AGENDAR'}
                  descripcion={`Agendar Cita para el Incidente ${descripcionbtnaction}`}
                  icon={'mdi mdi-calendar-plus'}
                />
          </Pagination.Item>
          <Pagination.Item>
                <BtnActions
                url={`/dashboard/AdministradorActas/RegistrarActa${tipo}?id=${props?.obj?.row}`}
                  permisos={'N'}
                  key={`ACTAS_${props?.obj?.key}`}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'ACTAS'}
                  descripcion={`Registrar Acta ${descripcionbtnaction}`}
                  icon={'mdi mdi-layers'}

                /> 
          </Pagination.Item>         
          <Pagination.Item>

                <BtnActions
                 url={`/dashboard/ModuloIncidentes/ConsultarIncidencia${tipo}?id=${props?.obj?.row}`}
                  permisos={'N'}
                  key={`DETALLES_${props?.obj?.key}`}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'DETALLES'}
                  descripcion={`Ver Detalles ${descripcionbtnaction}`}
                  icon={'mdi mdi-layers-search-outline'}

                /> 
          </Pagination.Item>
      </Pagination>
      </Row>
    </React.Fragment>
  );
}
export default BtnSeccionAction;
