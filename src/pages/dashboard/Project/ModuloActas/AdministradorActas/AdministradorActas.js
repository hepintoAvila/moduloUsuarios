/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { usePermisos } from '../../../../../hooks/usePermisos';
import RegistrarActas from './RegistrarActas';
const AdministradorActas = (props) => {

  const { tipo,itemUrl } = useContext(DashboardContext)


  const { permisos } = usePermisos(tipo);


  return (
    <React.Fragment>
     {props?.objConceptos ? ( <RegistrarActas
                  accion={itemUrl}
                  tipo={tipo}
                  permisos={permisos}
                  idActa={props.idActa}
                  idSolicitud={props.idSolicitud}
                  objConceptos={props.objConceptos}
                />):''}
    </React.Fragment>
  );
};
AdministradorActas.defaultProps = {
  itemsmenu: '/',
};
export default AdministradorActas;
