// @flow
import React, { useState,useContext } from 'react';
import { Button} from 'react-bootstrap';
import Select from 'react-select';
// components


import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import Swal from 'sweetalert2';
import { FormInput } from '../../../../../components';
import { useSecurity } from '../../../../../layouts/context/SecurityProvider';

const Register = (props) => {
  const { errors,checkSpecialChars } = useSecurity(); // Usamos el hook useSecurity


  const handleChange = (field) => (e) => {
    const value = e.target.value;
    checkSpecialChars(field, value);
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[0] = {
        ...newItems[0],
        [field]: value,
      };
      return newItems;
    });
  };

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
  ? Object.entries(datosEvent)
      .map(([key, value]) => {
        const encodedValue = btoa(value);
        return `${key}=${encodedValue}`;
      })
      .join('&')
  : '';

  setTimeout(function () {
    getData(queryDatos)
  }, 2000);
    setSignUpModalAdd(true)
    return window.location.hash = '#/dashboard/AdminUsuarios/Usuarios';
  };
  console.log(items)
   return (
    <>

 <form className="formModal">
        <FormInput
          label={'login'}
          type="text"
          name="login"
          value={items[0]?.login}
          onChange={handleChange('login')}
          placeholder={'Digite su login'}
          containerClass={`mb-3 ${errors.login?.hasSpecialChar || errors.login?.isEmpty ? 'bg-alert' : ''}`}
        />
        <FormInput
          label={'Email'}
          type="email"
          name="email"
          value={items[0]?.email}
          onChange={handleChange('email')}
          placeholder={'Digite su email'}
          containerClass={`mb-3 ${errors.email?.hasSpecialChar || errors.email?.isEmpty ? 'bg-alert' : ''}`}
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
          onChange={handleChange('nombres')}
          placeholder={'Digite sus nombres'}
          containerClass={`mb-3 ${errors.nombres?.hasSpecialChar || errors.nombres?.isEmpty ? 'bg-alert' : ''}`}
        />
          <FormInput
          label={'Apellidos'}
          type="text"
          name="apellidos"
          value={items[0]?.apellidos}
          onChange={handleChange('apellidos')}
          placeholder={'Digite sus apellidos'}
          containerClass={`mb-3 ${errors.apellidos?.hasSpecialChar || errors.apellidos?.isEmpty ? 'bg-alert' : ''}`}
        />
          <FormInput
          label={'Identificación'}
          type="number"
          name="identificacion"
          value={items[0]?.identificacion}
          onChange={handleChange('identificacion')}
          placeholder={'Digite sus identificacion'}
          containerClass={`mb-3 ${errors.identificacion?.hasSpecialChar || errors.identificacion?.isEmpty ? 'bg-alert' : ''}`}
        />
            <FormInput
          label={'Numero del Celular'}
          type="number"
          name="telefono"
          value={items[0]?.telefono}
          onChange={handleChange('telefono')}
          placeholder={'Digite el número de sus telefono'}
          containerClass={`mb-3 ${errors.telefono?.hasSpecialChar || errors.telefono?.isEmpty ? 'bg-alert' : ''}`}
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
