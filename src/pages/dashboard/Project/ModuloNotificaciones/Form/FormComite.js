// @flow
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Alert, Form, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { queryFormSend } from '../../../../../redux/actions';
import { VerticalForm } from '../../../../../components';
import FormInput from '../../../components/FormInput';
import TopbarSearchComite from './TopbarSearchComite';

const FormComite = (props): React$Element<React$FragmentType> => {
  const [items, setItems] = useState([{
    nombres:'',
    apellidos:'',
    identificacion:'',
    email:'',
    accion:props?.accion,
    tipo:props?.tipo,
  }]);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading, queryForm, error } = useSelector((state) => ({
    loading: state.Queryform.loading,
    error: state.Queryform.error,
    queryForm: state.Queryform.queryForm,
  }));


  const schemaResolver = yupResolver(
    yup.object().shape({
    })
  );

  const onSubmit = () => {
    dispatch(queryFormSend(...items))
  };
 
  return (
    <>
      {queryForm ? <Redirect to={`/dashboard/${props?.accion}/${props?.tipo}?p=1`}></Redirect> : <Redirect to={`/dashboard/${props?.accion}/${props?.tipo}?p=1`}></Redirect>}
      <div className="text-center w-75 m-auto">
        <h4 className="text-dark-50 text-center mt-0 fw-bold">REGISTRAR MIEMBRO DEL COMITÉ</h4>
      </div>
      {error && (
        <Alert variant="danger" className="my-2">
          {error}
        </Alert>
      )}
      <TopbarSearchComite/> 
      <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
        <Row>
        <FormInput
          label={t('Nombres')}
          type="text"
          name="nombres"
          value={items[0]?.nombres}
          onChange={(e) => setItems([{
            ...items[0], nombres: e.target.value,
          }])}
          placeholder={t('Digite el Nombre')}
          containerClass={'mb-3'}
        />
        <FormInput
          label={t('Apellidos')}
          type="text"
          name="apellidos"
          value={items[0]?.apellidos}
          onChange={(e) => setItems([{
            ...items[0], apellidos: e.target.value,
          }])}
          placeholder={t('Digite los Apellidos')}
          containerClass={'mb-3'}
        />
        <FormInput
          label={t('Identificación')}
          type="text"
          name="identificacion"
          value={items[0]?.identificacion}
          onChange={(e) => setItems([{
            ...items[0], identificacion: e.target.value,
          }])}
          placeholder={t('Digite la Identificación')}
          containerClass={'mb-3'}
        />
         <FormInput
          label={t('Email')}
          type="text"
          name="email"
          value={items[0]?.email}
          onChange={(e) => setItems([{
            ...items[0], email: e.target.value,
          }])}
          placeholder={t('Digite el Email')}
          containerClass={'mb-3'}
        />       
        </Row>        
        <Row>
          <Col sm={4}></Col>
          <Col sm={4}></Col>
            <Col sm={4}>
              <Form.Group className="mb-3 mb-3 mb-3 ">
                <Button variant="primary" type="submit" disabled={loading}>
                  {t('Asignar')}
                </Button>
              </Form.Group>
            </Col>
          </Row>
      </VerticalForm>

    </>
  );
};

export default FormComite;
