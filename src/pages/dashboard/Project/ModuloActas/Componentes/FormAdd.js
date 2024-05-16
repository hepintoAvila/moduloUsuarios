import React, {  useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';

/* custon FormAdd */


const FormAdd = (props) => {

  const { itemUrl, tipo } = useContext(DashboardContext);

  let userInfo = sessionStorage.getItem('hyper_user');
  const user = JSON.parse(userInfo);
  return (
    <React.Fragment>
      <Fields
        accion={itemUrl}
        tipo={tipo}
        title={props.title}
        validated={props.validated}
        opcion={'add'}
        textBtn={'Registrar Acta'}
        entidad={user[0]?.entidad}

      />
    </React.Fragment>
  );
}
export default FormAdd;
