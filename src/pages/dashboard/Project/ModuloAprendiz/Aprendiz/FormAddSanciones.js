import React, {  useContext } from 'react';
import FieldSanciones from './FieldSanciones';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const FormAddSanciones = (props) => {

  const { itemUrl, tipo } = useContext(DashboardContext);

  let userInfo = sessionStorage.getItem('hyper_user');
  const user = JSON.parse(userInfo);
  return (
    <React.Fragment>

      <FieldSanciones
        accion={itemUrl}
        tipo={tipo}
        title={props.title}
        validated={props.validated}
        opcion={'sanciones'}
        textBtn={'Registrar Sanciones Aprendiz'}
        entidad={user[0]?.entidad}

      />
    </React.Fragment>
  );
}
export default FormAddSanciones;
