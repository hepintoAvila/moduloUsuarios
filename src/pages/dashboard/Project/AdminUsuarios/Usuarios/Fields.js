// @flow
import React, { useState, useContext } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import classnames from 'classnames';
// components
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import Swal from 'sweetalert2';
import Spinner from '../../../components/Spinner';
import useNumericValidation from '../../../../../hooks/useValidacion'; // Cambia esta ruta según tu estructura de archivos

const Register = (props) => {
  const [validated, setValidated] = useState(false);
  const { getData, loading } = useContext(NotificacionesContext);
  const { setSignUpModalAdd } = useContext(DashboardContext);

  const [items, setItems] = useState({
    login: props?.usuario?.length === 1 ? props?.usuario[0]?.login : '',
    email: props?.usuario?.length === 1 ? props?.usuario[0]?.email : '',
    rol: props?.usuario?.length === 1 ? props?.usuario[0]?.rol : '',
    nombres: '',
    apellidos: '',
    identificacion: '',
    telefono: '',
  });

  const { errors, handleNumericValidation } = useNumericValidation();

  const onItemSelect = (event, opcion) => {
    const value = event.target.value;
    if (['identificacion', 'telefono'].includes(opcion)) { // Validar ambos campos
      handleNumericValidation(value, opcion, setItems);
    } else {
      setItems((prevState) => ({
        ...prevState,
        [opcion]: value,
      }));
    }
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Registro Enviado',
        showConfirmButton: false,
        timer: 1500,
      });
      const datosEvent = {
        ...items,
        accion: 'AdminUsuarios',
        opcion: 'add',
        tipo: 'Usuarios',
      };

      const queryDatos = datosEvent
        ? Object.entries(datosEvent)
            .map(([key, value]) => {
              const encodedValue = btoa(value);
              return `${key}=${encodedValue}`;
            })
            .join('&')
        : '';

      setTimeout(function () {
        getData(queryDatos);
      }, 2000);
      setSignUpModalAdd(true);
    }
    setValidated(true);
  };



  return (
    <>
      <Alert variant={'success'}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className={classnames('mh-100')}>
            <Form.Group className={classnames('w-15 p-0 ')}>
              <Form.Group className="form-group mb-3">
                <label className="form-label">login</label> <br />
                <Form.Control
                  type="text"
                  containerClass={'mb-3'}
                  name="login"
                  onChange={(e) => onItemSelect(e, 'login')}
                  defaultValue={items?.login}
                  key="login"
                  id="login"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor asigne el login.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Group>
            <Form.Group className={classnames('w-15 p-0')}>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Email</label> <br />
                <Form.Control
                  type="email"
                  key="email"
                  id="email"
                  required
                  name="email"
                  inputMode="email"
                  defaultValue={items?.email}
                  onChange={(e) => onItemSelect(e, 'email')}
                  containerClass={'mb-3'}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor asigne el Email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Nombres</label> <br />
                <Form.Control
                  type="text"
                  key="nombres"
                  id="nombres"
                  required
                  name="nombres"
                  defaultValue={items?.nombres}
                  onChange={(e) => onItemSelect(e, 'nombres')}
                  containerClass={'mb-3'}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor asigne los nombres.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Apellidos</label> <br />
                <Form.Control
                  type="text"
                  key="apellidos"
                  id="apellidos"
                  required
                  name="apellidos"
                  defaultValue={items?.nombres}
                  onChange={(e) => onItemSelect(e, 'apellidos')}
                  containerClass={'mb-3'}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor asigne los apellidos.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Rol</label> <br />
                <Form.Select
                  key="rol"
                  id="rol"
                  required
                  name="rol"
                  value={items?.rol}
                  onChange={(e) => onItemSelect(e, 'rol')}
                  containerClass={'mb-3'}
                >
                  <option value="">Seleccione un rol</option>
                  {props?.opcionroles?.map((role, index) => (
                    <option key={index} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Por favor asigne el rol.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Identificación</label> <br />
                <Form.Control
                  type="text"
                  key="identificacion"
                  id="identificacion"
                  required
                  name="identificacion"
                  value={items?.identificacion} // Cambiar defaultValue a value
                  onChange={(e) => onItemSelect(e, 'identificacion')}
                  containerClass={'mb-3'}
                  isInvalid={!!errors.identificacion}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.identificacion}
                </Form.Control.Feedback>
              </Form.Group>
              <label className="form-label">Telefono</label> <br />
              <Form.Control
                type="text"
                key="telefono"
                id="telefono"
                required
                name="telefono"
                value={items?.telefono}
                onChange={(e) => onItemSelect(e, 'telefono')}
                containerClass={'mb-3'}
                isInvalid={!!errors.telefono}
              />
              <Form.Control.Feedback type="invalid">
              {errors?.telefono}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="w-15 p-1">
              <div className="form-group mb-3">
                <label className="form-label">{''}</label> <br />
                {!loading ? (
                  <Button type="submit" variant="success">
                    <Spinner />
                  </Button>
                ) : (
                  <Button type="submit" variant="success">
                    Enviar
                  </Button>
                )}
              </div>
            </Form.Group>
          </Form.Group>
        </Form>
      </Alert>
    </>
  );
};

export default Register;
