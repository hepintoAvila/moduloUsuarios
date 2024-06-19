/* eslint-disable no-template-curly-in-string */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { Row, Card, } from 'react-bootstrap';

// components
import { VerticalForm, FormInput } from '../../../../../components';
import HyperDatepicker from '../../../../../components/Datepicker';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import BtnActualizarOpciones from '../Components/BtnActualizarOpciones';

const FormEditarSolicitud = (props) => {


  const [selectedDate, setSelectedDate] = useState(new Date());

  const { convertirFecha } = useContext(NotificacionesContext);

  const { validateError, setError, loading,idSolicitud, setidSolicitud  } =
    useContext(SearchContext);
  const datosAprendiz = props?.itemsConsultarSolicitudByCodigo?.data?.Solicitudes || [];
  const [items, setItems] = useState([
    {
      idAprendiz: '',
      tipoComite: '',
      tipoAtencion: '',
      fechaIncidente: '',
      accion: 'ModuloSolicitudComite',
      opcion: 'add_solicitud',
      tipo: 'EnviarSolicitud',
    },
  ]);
  const schemaResolver = yupResolver(yup.object().shape({}));
  const onDateChangefechaIncidente = (e, fechaError) => {
    if (e) {
      setSelectedDate(e);
      setError({ ...validateError, fechaError: fechaError });

      setItems([
        {
          ...items[0],
          fechaIncidente: convertirFecha(`${e}`),
        },
      ]);
    }
  };


  const onChangeTipoAtencion = (value, tipoAtencionError) => {
    if (value) {
      setError({ ...validateError, tipoAtencionError: tipoAtencionError });
      setItems([
        {
          ...items[0],
          tipoAtencion: value,
        },
      ]);
    }
  };

  const onChangeTipoComite = (value, comiteError) => {
    if (value) {
      setError({ ...validateError, comiteError: comiteError });
      setItems([
        {
          ...items[0],
          tipoComite: value,
        },
      ]);
    }
  };

  useEffect(() => {
    if (datosAprendiz.length === 1) {
      const objet = {
        idAprendiz: datosAprendiz[0]?.idAprendiz,
        aprendiz: datosAprendiz[0]?.aprendiz,
        tipoComite: datosAprendiz[0]?.tipoSolicitud,
        tipoAtencion: datosAprendiz[0]?.tipoAtencion,
        fechaIncidente: datosAprendiz[0]?.fechaSolicitud,
        fechaHora: datosAprendiz[0]?.fechaHora,
        accion: 'ModuloSolicitudComite',
        opcion: 'add_solicitud',
        tipo: 'EnviarSolicitud',
        selectedFile: '',
        base64String: '',
      };
      setItems([objet]);
      setidSolicitud(props?.idSolicitud)
    }
  }, []);
 //* console.log('idSolicitud',idSolicitud)
  return (
    <>
      {loading ? (
        <Redirect to={`p=${idSolicitud}`}></Redirect>
      ) : null}
      <VerticalForm
        resolver={schemaResolver}
        defaultValues={{}}
        className={classNames('col-8')}>
        <Row>

          <Card className={classNames('widget-flat')}>
            <Card.Body>
              <br />
              <label> Seleccione el tipo de falta:</label>
              <label className={classNames('editTitulos')}>
                <i className="mdi mdi-account-check"></i>
                {items[0]?.tipoComite}
              </label>
              <Row className="align-items-center">
                <div className="mb-0 col-8">
                  <FormInput
                    name="tipoComite"
                    label=""
                    type="select"
                    containerClass="mb-3"
                    className="form-select"
                    key="tipoComite"
                    isInvalid={!validateError.comiteError}
                    onChange={(e) => onChangeTipoComite(e.target.value, true)}>
                    <option>Seleccione...</option>
                    <option value="ACADEMICO"> ACADEMICO</option>
                    <option value="DISCIPLINARIO">DISCIPLINARIO</option>
                    <option value="ACADEMICO Y DISCIPLINARIO">ACADEMICO Y DISCIPLINARIO</option>
                  </FormInput>
                </div>
                <div className="uploadSolicitud col-4 avatar-sm">
                  <BtnActualizarOpciones
                    menuRef={`?p=${idSolicitud}`}
                    titulo={'tipoComite'}
                    descripcion={'Actualiza el tipo de falta'}
                    value={items[0]?.tipoComite}
                    permisos={'N'}
                    idSolicitud={idSolicitud}
                    icon={'fa fa-save pt-3'}
                  />
                </div>
              </Row>
              <hr />
              <Row className="align-items-center">
                <label>Seleccione la calificación de la falta:</label>
                <label className={classNames('editTitulos')}>
                  <i className="mdi mdi-account-check"></i>
                  {items[0]?.tipoAtencion}
                </label>
                <div className="mb-0 col-8">
                  <FormInput
                    name="tipoAtencion"
                    label=""
                    type="select"
                    containerClass="mb-3 font-weight-bold"
                    className="form-select"
                    key="tipoAtencion"
                    isInvalid={!validateError.tipoAtencionError}
                    onChange={(e) => onChangeTipoAtencion(e.target.value, true)}>
                    <option>Seleccione...</option>
                    <option value="Leve">Leve</option>
                    <option value="Grave">Grave</option>
                    <option value="Gravísimas">Gravísimas</option>
                  </FormInput>
                </div>
                <div className="uploadSolicitud col-4 avatar-sm">
                  <BtnActualizarOpciones
                    menuRef={`?p=${idSolicitud}`}
                    titulo={'tipoAtencion'}
                    descripcion={'Actualiza la calificación de la falta'}
                    value={items[0]?.tipoAtencion}
                    permisos={'N'}
                    idSolicitud={idSolicitud}
                    icon={'fa fa-save pt-3'}
                  />
                </div>
              </Row>
              <hr />
              <Row className="align-items-center">
                <label>Fecha y Hora de los Hechos:</label>
                <label className={classNames('editTitulos')}>
                  <i className="mdi mdi-account-check"></i>
                  {items[0]?.fechaIncidente}
                </label>
                <div className="mb-5 col-8">
                  <HyperDatepicker
                    label=""
                    name="fechaIncidente"
                    hideAddon={true}
                    showTimeSelect
                    timeFormat="HH:mm"
                    tI={60}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                    className="form-control"
                    value={selectedDate}
                    onChange={(date) => onDateChangefechaIncidente(date, true)}
                  /><div className="uploadSolicitudFechaHora col-4 avatar-sm">
                    <BtnActualizarOpciones
                  titulo={'fechaIncidente'}
                  descripcion={'Fecha y Hora de los Hechos'}
                  value={items[0]?.fechaIncidente}
                  permisos={'N'}
                  idSolicitud={idSolicitud}
                  icon={`${'fa fa-save pt-4'}` }
                  menuRef={`?p=${idSolicitud}`}
                />
                </div>
                 <div className="pt-0 col-8">
                  {!validateError.fechaError ? (
                    <div className="pt-0  col-12"><label className={classNames('editTitulos col-12 titleFechaHora')}>Seleccione la fecha y hora de los hechos </label></div>
                  ) : (
                    ''
                  )}
                </div>
                </div>


              </Row>

              <hr />

            </Card.Body>
          </Card>
        </Row>
      </VerticalForm>
    </>
  );
};

export default FormEditarSolicitud;
