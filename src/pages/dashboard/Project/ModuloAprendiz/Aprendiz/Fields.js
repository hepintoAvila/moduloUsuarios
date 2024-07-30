// @flow
import React, { useState, useContext } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

// components


import Spinner from '../../../../../components/Spinner';
import { useAprendiz } from '../../../../../hooks/useAprendiz';

import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import Swal from 'sweetalert2';
import classnames from 'classnames';
import classNames from 'classnames';
import useNumericValidation from '../../../../../hooks/useValidacion';

const Fields = (props) => {
  const [validated, setValidated] = useState(false);
  const { getData } = useContext(NotificacionesContext);
  const { isLoading, queryAprendiz } = useAprendiz();
  const { setSignUpModalAdd } = useContext(DashboardContext);
  const { objAprendiz } = props;
  const [items, setItems] = useState(
    {
      idAprendiz: props?.idAprendiz > 0 ? props?.idAprendiz : 0,
      nombres: objAprendiz?.nombres?.length > 1 ? objAprendiz?.nombres : '',
      apellidos: objAprendiz?.apellidos?.length > 1 ? objAprendiz?.apellidos : '',
      tipoIdentificacion: objAprendiz?.tipoIdentificacion?.length > 1 ? objAprendiz?.tipoIdentificacion : '',
      identificacion: objAprendiz?.identificacion?.length > 1 ? objAprendiz?.identificacion : '',
      telefono: objAprendiz?.telefono?.length > 1 ? objAprendiz?.telefono : '',
      correo: objAprendiz?.correo?.length > 1 ? objAprendiz?.correo : '',
      direccion: objAprendiz?.direccion?.length > 1 ? objAprendiz?.direccion : '',
      programaFormacion: objAprendiz?.programaFormacion?.length > 1 ? objAprendiz?.programaFormacion : '',
      proyectoFormativo: objAprendiz?.proyectoFormativo?.length > 1 ? objAprendiz?.proyectoFormativo : '',
      jornada: objAprendiz?.jornada?.length > 1 ? objAprendiz?.jornada : '',
      etapa: objAprendiz?.etapa?.length > 1 ? objAprendiz?.etapa : '',
      ficha: objAprendiz?.ficha?.length > 1 ? objAprendiz?.ficha : '',
      municipio: objAprendiz?.municipio?.length > 1 ? objAprendiz?.municipio : '',
      opcion: props?.opcion?.length > 1 ? props?.opcion : '',


    },
  );
  const { errors, handleNumericValidation } = useNumericValidation();

  const onItemSelect = (event, opcion) => {
    const value = event.target.value;
    if (['identificacion', 'telefono', 'ficha'].includes(opcion)) { // Validar ambos campos
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
        title: 'Registro Enviado...',
        showConfirmButton: false,
        timer: 1500,
      });
      const datosEvent = {
        ...items,
        accion: 'ModuloAprendiz',
        opcion: props?.opcion,
        tipo: 'aprendiz',
      };


      const queryDatos = datosEvent
        ? Object.keys(datosEvent)
          .map((key) => key + '=' + btoa(datosEvent[key]))
          .join('&')
        : '';
      setTimeout(function () {
        getData(queryDatos);
        queryAprendiz('ModuloAprendiz', 'aprendiz', [{ opcion: btoa('listaAprendiz'), obj: 'aprendiz' }]);
      }, 2000);
      setSignUpModalAdd(true);
    }
    setValidated(true);
  };


const tipoIdentificacion = [{
  label:'CC',
  value:'CC',
},{
  label:'TI',
  value:'TI',
},{
  label:'CE',
  value:'CE',
}];

  return (
    <>
      <Alert variant={'success'}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className={classnames("mh-100")}>
            <Form.Group className={classnames("w-15 p-0 ")}>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Nombres</label> <br />
                <Form.Control
                  type="text"
                  containerClass={'mb-3'}
                  name="nombres"
                  onChange={(e) => { (onItemSelect(e, 'nombres')) }}
                  defaultValue={items?.nombres}
                  key="nombres"
                  id="nombres"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor asigne el Nombres.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Group>
            <Form.Group className={classnames("w-15 p-0")}>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Apellido</label> <br />
                <Form.Control type="text"
                  key="apellidos"
                  id="apellidos"
                  required
                  name="apellidos"
                  defaultValue={items?.apellidos}
                  onChange={(e) => { (onItemSelect(e, 'apellidos')) }}
                  containerClass={'mb-3'}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor asigne el Apellido.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Group>
            <Form.Group className="form-group mb-3">
                <label className="form-label">Tipo Identificacion</label> <br />
                <Form.Select
                  key="tipoIdentificacion"
                  id="tipoIdentificacion"
                  required
                  name="tipoIdentificacion"
                  value={items?.tipoIdentificacion}
                  onChange={(e) => onItemSelect(e, 'tipoIdentificacion')}
                  containerClass={'mb-3'}
                >
                  <option value="">Tipo Identificacion</option>
                  {tipoIdentificacion?.map((items, index) => (
                    <option key={index} value={items.value}>
                      {items.label}
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
            <Form.Group className={classnames("w-15 p-0")}>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Telefono</label> <br />
                <Form.Control
                  type="text"
                  key="telefono"
                  id="telefono"
                  required
                  name="telefono"
                  value={items?.telefono} // Cambiar defaultValue a value
                  onChange={(e) => onItemSelect(e, 'telefono')}
                  containerClass={'mb-3'}
                  isInvalid={!!errors.telefono}
                />
                <Form.Control.Feedback type="invalid">
                {errors?.telefono}
              </Form.Control.Feedback>
              </Form.Group>
            </Form.Group>
            <Form.Group className={classnames("w-15 p-0")}>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Correo</label> <br />
                <Form.Control
                  type="email"
                  name="correo"
                  key="correo"
                  id="correo"
                  inputMode="email"
                  required
                  defaultValue={items[0]?.correo}
                  onChange={(e) => { (onItemSelect(e, 'correo')) }}
                  containerClass={'mb-3'}
                /><Form.Control.Feedback type="invalid">
                  Por favor digite correo.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Group>
            <Form.Group className={classnames("w-15 p-0")}>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Direccion</label> <br />
                <Form.Control type="text"
                  key="direccion"
                  id="direccion"
                  required
                  name="direccion"
                  defaultValue={items?.direccion}
                  onChange={(e) => { (onItemSelect(e, 'direccion')) }}
                  containerClass={'mb-3'}
                /><Form.Control.Feedback type="invalid">
                  Por favor digite direccion.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Group>
            <Form.Group className={classnames("w-15 p-0")}>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Programa Formacion</label> <br />
                <Form.Control type="text"
                  key="programaFormacion"
                  id="programaFormacion"
                  required
                  name="programaFormacion"
                  defaultValue={items?.programaFormacion}
                  onChange={(e) => { (onItemSelect(e, 'programaFormacion')) }}
                  containerClass={'mb-3'}
                /><Form.Control.Feedback type="invalid">
                  Por favor seleccione el Programa Formacion.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Group>
            <Form.Group className={classnames("w-15 p-0")}>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Proyecto Formativo</label> <br />
                <Form.Control type="text"
                  name="proyectoFormativo"
                  key="proyectoFormativo"
                  id="proyectoFormativo"
                  required
                  defaultValue={items?.proyectoFormativo}
                  onChange={(e) => { (onItemSelect(e, 'proyectoFormativo')) }}
                  containerClass={'mb-3'}
                /><Form.Control.Feedback type="invalid">
                  Por favor digite el Proyecto Formativo
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Group>
            <Form.Group className={classnames("w-15 p-0")}>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Jornada</label> <br />
                <Form.Control type="text"
                  key="jornada"
                  id="jornada"
                  required
                  name="jornada"
                  defaultValue={items?.jornada}
                  onChange={(e) => { (onItemSelect(e, 'jornada')) }}
                  containerClass={'mb-3'}
                /><Form.Control.Feedback type="invalid">
                  Por favor seleccione la Jornada.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Group>
            <Form.Group className={classNames("w-15 p-0")}>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Etapa</label> <br />
                <Form.Control type="text"
                  key="etapa"
                  id="etapa"
                  required
                  name="etapa"
                  defaultValue={items?.etapa}
                  onChange={(e) => { (onItemSelect(e, 'etapa')) }}
                  containerClass={'mb-3'}
                /><Form.Control.Feedback type="invalid">
                  Por favor asigne la Etapa.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Group>
            <Form.Group className={classnames("w-15 p-0")}>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Ficha</label> <br />
                <Form.Control
                  type="text"
                  key="ficha"
                  id="ficha"
                  required
                  name="ficha"
                  value={items?.ficha} // Cambiar defaultValue a value
                  onChange={(e) => onItemSelect(e, 'ficha')}
                  containerClass={'mb-3'}
                  isInvalid={!!errors.ficha}
                />
                <Form.Control.Feedback type="invalid">
                {errors?.ficha}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Group>
            <Form.Group className={classNames("w-15 p-0")}>
              <Form.Group className="form-group mb-3">
                <label className="form-label">Municipio</label> <br />
                <Form.Control type="text"
                  key="municipio"
                  id="municipio"
                  required
                  name="municipio"
                  defaultValue={items?.municipio}
                  onChange={(e) => { (onItemSelect(e, 'municipio')) }}
                  containerClass={'mb-3'}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor asigne el Municipio.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Group>
            <Form.Group className="w-15 p-1">
              <div className="form-group mb-3">
                <label className="form-label">{''}</label> <br />
                {
                  isLoading ? <Button type="submit" variant="success">
                    <Spinner />
                  </Button> : <Button type="submit" variant="success">
                    Enviar
                  </Button>
                }

              </div>
            </Form.Group>
          </Form.Group>
        </Form>
      </Alert>
    </>
  );
};

export default Fields;
