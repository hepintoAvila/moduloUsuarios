import { Pagination, Row } from "react-bootstrap";

import React from "react";
import BtnActions from "../pages/dashboard/Project/ModuloSolicitudComite/Components/BtnActions";
const BtnSeccionPdf = (props) => {

const descripcionbtnaction = props?.obj?.descripcionbtnaction || 'en .pdf';

  return (
    <React.Fragment>
      <Row>
        <Pagination className="pagination-rounded mx-auto" size="sm">
          <Pagination.Item>
                <BtnActions
                 url={`/dashboard/ModuloSolicitudComite/EnviarSolicitud?p=${props?.obj?.row}`}
                  permisos={'N'}
                  key={`CONCEPTO${props?.obj?.key}`}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'CONCEPTO'}
                  codigoFicha={props?.obj?.codigoFicha}
                  descripcion={`Ver concepto del instructor ${descripcionbtnaction}`}
                  icon={'mdi mdi-account-convert'}
                />
          </Pagination.Item> 
          <Pagination.Item>
                <BtnActions
                 url={`/dashboard/ModuloSolicitudComite/EnviarSolicitud?p=${props?.obj?.row}`}
                  permisos={'N'}
                  key={`CRITERIO DEL COMITE${props?.obj?.key}`}
                  codigoFicha={props?.obj?.codigoFicha}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'CRITERIO'}
                  descripcion={`Ver criterio del Comité ${descripcionbtnaction}`}
                  icon={'mdi mdi-account-multiple-check-outline'}
                />
          </Pagination.Item>  
          <Pagination.Item>
                <BtnActions
                 url={`/dashboard/ModuloSolicitudComite/EnviarSolicitud?p=${props?.obj?.row}`}
                  permisos={'N'}
                  key={`PLAN DE MEJORAMIENTO${props?.obj?.key}`}
                  codigoFicha={props?.obj?.codigoFicha}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'MEJORAMIENTO'}
                  descripcion={`Plan de Mejoramiento${descripcionbtnaction}`}
                  icon={'mdi mdi-account-reactivate'}
                />
          </Pagination.Item>                    
      </Pagination>
      </Row>
    </React.Fragment>
  );
}
export default BtnSeccionPdf;
