import { Pagination, Row } from "react-bootstrap";

import React, { useContext } from "react";

import BtnActions from "../../../components/BtnActions";
import { DashboardContext } from "../../../../../layouts/context/DashboardContext";
import { useAdminUsuarios } from "../../../../../hooks/useAdminUsuarios";

const BtnActas = (props) => {

  const {verificarPermiso} = useAdminUsuarios()
  const descripcionbtnaction = props?.obj?.descripcionbtnaction || '';

  const { selectedItemsConsolidados, toggleItemConsolidados } = useContext(DashboardContext);

  const handleCheckboxConsolidados = () => {
    toggleItemConsolidados(props?.obj?.key);
  };


  return (
    <React.Fragment>

      <Row>
        <Pagination className="pagination-rounded mx-auto" size="sm">
          <Pagination.Item>

          {verificarPermiso('Actas',"update") ?<BtnActions
                  permisos={'S'}
                  key={`EDITAR_${props?.obj?.key}`}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'EDITAR'}
                  descripcion={`Editar ${descripcionbtnaction}`}
                  icon={'mdi mdi-square-edit-outline'}
                />:''}
          </Pagination.Item>

          <Pagination.Item>
          {verificarPermiso('Actas',"query") ?<BtnActions
                  permisos={'S'}
                  key={`SOLICITUDES${props?.obj?.key}`}
                  toggleActions={props?.obj?.listarEstudiante}
                  row={props?.obj?.row}
                  titulo={'ASIGNAR'}
                  descripcion={`Asignar Solicitudes de casos al acta del comite`}
                  icon={'mdi mdi-account-alert'}

                />:''}
          </Pagination.Item>
          <Pagination.Item>
          {verificarPermiso('Actas',"add") ?<BtnActions
                  permisos={'S'}
                  key={`ASIGNADOS${props?.obj?.key}`}
                  toggleActions={props?.obj?.listarEstudiante}
                  row={props?.obj?.row}
                  titulo={'ASIGNADOS'}
                  descripcion={`Listado de Solicitudes asignadas al acta del comite`}
                  icon={'mdi mdi-account-check-outline'}
                />:''}
          </Pagination.Item>
          <Pagination.Item>
          {verificarPermiso('Actas',"query") ?<BtnActions
                  permisos={'S'}
                  key={`ASISTENCIAS${props?.obj?.key}`}
                  toggleActions={props?.obj?.registrarAsistentes}
                  row={props?.obj?.row}
                  titulo={'ASISTENCIAS'}
                  descripcion={`Registro de Asistencia y Aprobación del Acta`}
                  icon={'mdi mdi-account-details'}
                />:''}
          </Pagination.Item>
          {
      }
          <Pagination.Item>
          {verificarPermiso('Actas',"delete") ?<BtnActions
                  permisos={'S'}
                  key={`ELIMINAR_${props?.obj?.key}`}
                  toggleActions={props?.obj?.eliminar}
                  row={props?.obj?.row}
                  titulo={'ELIMINAR'}
                  descripcion={`Eliminar ${descripcionbtnaction}`}
                  icon={'mdi mdi-delete'}

                />:''}
          </Pagination.Item>
          <Pagination.Item>
          {verificarPermiso('Actas',"add") ?<input
              type="checkbox"
              checked={selectedItemsConsolidados.includes(props?.obj?.key)}
              onChange={handleCheckboxConsolidados}
            />:''}
          </Pagination.Item>
      </Pagination>
      </Row>
    </React.Fragment>
  );
}
export default BtnActas;
