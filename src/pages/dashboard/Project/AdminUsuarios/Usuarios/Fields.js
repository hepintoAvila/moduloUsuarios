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
    nombres:'',
    apellidos:'',
    identificacion:'',
    telefono:'',
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
          <FormInput
          label={'Nombres'}
          type="text"
          name="nombres"
          value={items[0]?.nombres}
          onChange={(e) => setItems([{
            ...items[0], nombres: e.target.value
          }])}
          placeholder={'Digite sus nombres'}
          containerClass={'mb-3'}
        />
          <FormInput
          label={'Apellidos'}
          type="text"
          name="apellidos"
          value={items[0]?.apellidos}
          onChange={(e) => setItems([{
            ...items[0], apellidos: e.target.value
          }])}
          placeholder={'Digite sus apellidos'}
          containerClass={'mb-3'}
        />
          <FormInput
          label={'Identificación'}
          type="text"
          name="identificacion"
          value={items[0]?.identificacion}
          onChange={(e) => setItems([{
            ...items[0], identificacion: e.target.value
          }])}
          placeholder={'Digite sus identificacion'}
          containerClass={'mb-3'}
        />  
            <FormInput
          label={'Numero del Celular'}
          type="text"
          name="telefono"
          value={items[0]?.telefono}
          onChange={(e) => setItems([{
            ...items[0], telefono: e.target.value
          }])}
          placeholder={'Digite el número de sus telefono'}
          containerClass={'mb-3'}
        />          
        <div className="mb-3 mb-0 text-center">

        </div>
      </form>
      <div className="mb-2 mb-6 text-center">
      <Button variant="success" type="submit" className="btn btn-success" style={{ marginTop: '25px' }} onClick={() => Registrarse({...items})}>
        Regitrar Usuarios</Button>
      </div>
      
    </>
  );
};

export default Register;
