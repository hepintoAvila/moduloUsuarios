// @flow
import React, { useState,useContext } from 'react';
import { Button} from 'react-bootstrap';
import Select from 'react-select';
// components
import { FormInput } from '../../../../../components/';
 
 
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import Swal from 'sweetalert2';
const Register = (props): React$Element<React$FragmentType> => {
  const {
    getData,
} = useContext(NotificacionesContext)
const {setSignUpModalAdd,
} = useContext(DashboardContext);

  const [items, setItems] = useState([{
    login: props?.usuario?.length===1? props?.usuario[0]?.login:'',
    email: props?.usuario?.length===1? props?.usuario[0]?.email:'',
    rol: props?.usuario?.length===1?props?.usuario[0]?.rol:'',
  }]);

  const Registrarse = (items) => {
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Registro Enviado',
      showConfirmButton: false,
      timer: 1500
    }) 
    const datosEvent = {
      ...items[0],
      accion: 'AdminUsuarios',
      opcion: 'add',
      tipo: 'Usuarios',
  }
  const queryDatos = datosEvent
  ? Object.keys(datosEvent)
      .map((key) => key + '=' + btoa(datosEvent[key]))
      .join('&')
  : '';
 
  setTimeout(function () {
    getData(queryDatos)
  }, 2000);
    setSignUpModalAdd(true)
    return window.location.hash = '#/dashboard/AdminUsuarios/Usuarios';
  };

   return (
    <>
 
 <form className="formModal">
        <FormInput
          label={'login'}
          type="text"
          name="login"
          value={items[0]?.login}
          onChange={(e) => setItems([{
            ...items[0], login: e.target.value,
          }])}
          placeholder={'Digite su login'}
          containerClass={'mb-3'}
        />
        <FormInput
          label={'Email'}
          type="email"
          name="email"
          value={items[0]?.email}
          onChange={(e) => setItems([{
            ...items[0], email: e.target.value
          }])}
          placeholder={'Digite su email'}
          containerClass={'mb-3'}
        />
        <Select
          type="select"
          name="rol"
          className="react-select"
          classNamePrefix="react-select"
          onChange={(e) => setItems([{
            ...items[0], rol: e.value,
             }])}
          options={props?.opcionroles}
          placeholder="Selecione el Rol..."
          selected={props?.roles?.value}
        />
        <div className="mb-3 mb-0 text-center">

        </div>
      </form>
      <Button variant="success" type="submit" className="btn btn-success" onClick={() => Registrarse({...items})}>
        Regitrar Usuarios</Button>
    </>
  );
};

export default Register;
