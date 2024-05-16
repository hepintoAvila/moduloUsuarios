import React, {  useContext } from 'react';
import ListSolicitudes from './ListSolicitudes';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const FieldSolicitudes = (props) => {

  const { itemUrl, tipo } = useContext(DashboardContext);

  let userInfo = sessionStorage.getItem('hyper_user');
  const user = JSON.parse(userInfo);

  return (
    <React.Fragment>

      <ListSolicitudes
        accion={itemUrl}
        tipo={tipo}
        title={props.title}
        validated={props.validated}
        opcion={'solicitudes'}
        textBtn={'Registrar solicitudes'}
        entidad={user[0]?.entidad}
        idActa={props.idActa}
      />
    </React.Fragment>
  );
}
export default FieldSolicitudes;
