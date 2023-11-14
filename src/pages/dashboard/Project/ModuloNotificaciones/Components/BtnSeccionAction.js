import { Pagination, Row } from "react-bootstrap";

import React from "react";
import BtnSelect from "./BtnSelect";

const BtnSeccionAction = (props) => {

  return (
    <React.Fragment>
      <Row>
        <Pagination className="pagination-rounded mx-auto" size="sm">
        <Pagination.Item>
        <BtnSelect
                  permisos={'N'}
                  isCheckedItem={props?.obj?.isCheckedItem}
                  key={`AGENDAR${props?.obj?.key}`}
                  handleOnChange={props?.obj?.handleOnChange}
                  row={props?.obj?.row}
                  titulo={'AGENDAR'}
                  isChecked={props?.obj?.isChecked}
                  descripcion={`Agendar Cita para el Incidente`}
                  icon={'mdi mdi-calendar-plus'}
                  opcion={'AGENDAR'}
                />
        </Pagination.Item>
      </Pagination>
      </Row>
    </React.Fragment>
  );
}
/*
         <Pagination.Item>

                <BtnActions
                 url={`/dashboard/ModuloNotificaciones/AgendarCitas?p=${props?.obj?.row}`}
                  permisos={'N'}
                  key={`AGENDAR${props?.obj?.key}`}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'AGENDAR'}
                  descripcion={`Agendar Cita para el Incidente`}
                  icon={'mdi mdi-calendar-plus'}
                  opcion={'AGENDAR'}
                />
          </Pagination.Item>
          <Pagination.Item>
                <BtnActions
                url={`/dashboard/AdministradorActas/RegistrarActa?p=${props?.obj?.row}`}
                  permisos={'N'}
                  key={`ACTAS_${props?.obj?.key}`}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'CONSOLIDADOS'}
                  descripcion={`En esta sección se pueden registrar los Consolidados y partes del Acta`}
                  icon={'mdi mdi-layers'}
                  opcion={'ACTAS'}
                />
          </Pagination.Item>
          <Pagination.Item>
                <BtnActions
                 url={`/dashboard/ModuloSolicitudComite/ConsultarIncidencia?p=${props?.obj?.row}`}
                  permisos={'N'}
                  key={`DETALLES_${props?.obj?.key}`}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'DETALLES'}
                  descripcion={`Ver Detalles`}
                  icon={'mdi mdi-layers-search-outline'}
                  opcion={'DETALLES'}
                />
          </Pagination.Item>
          <Pagination.Item>
          <BtnActions
          url={`/dashboard/ModuloNotificaciones/ConsultaNotificaciones?p=${props?.obj?.row}`}
            permisos={'N'}
            key={`COMITE_${props?.obj?.key}`}
            toggleActions={props?.obj?.toggleModal}
            row={props?.obj?.row}
            titulo={'REGISTRAR COMITE'}
            descripcion={`Asignar miembros del comité al incidente`}
            icon={'mdi mdi-account-multiple-plus'}
            opcion={'COMITE'}
          />
          </Pagination.Item>
          <Pagination.Item>
          <BtnActions
          url={`/dashboard/ModuloNotificaciones/ConsultaNotificaciones?p=${props?.obj?.row}`}
            permisos={'N'}
            key={`VOZ_${props?.obj?.key}`}
            toggleActions={props?.obj?.toggleModal}
            row={props?.obj?.row}
            titulo={'REGISTRAR CONCEPTO O VOZ'}
            descripcion={`Registrar el concepto de miembro del comité`}
            icon={'mdi mdi-account-tie-voice'}
            opcion={'VOZ'}
          />

</Pagination.Item>
*/
export default BtnSeccionAction;
