// @flow
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Alert, Form, Col, Row, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { queryFormSend } from '../../../../../redux/actions';
import { VerticalForm } from '../../../../../components';
import FormInput from '../../../components/FormInput';
 
const FormVoz = (props): React$Element<React$FragmentType> => {

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
    dispatch(queryFormSend(sessionStorage.getItem('OPTIONS')))
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
      <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
        <Row>
        <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-3">Descripción del concepto emitido</h4>
                            <FormInput
                                    label="Descripción"
                                    type="textarea"
                                    name="textarea"
                                    rows="10"
                                    containerClass={'mb-3'}
                                    key="textarea"
                                />
                        </Card.Body>
                    </Card>
                </Col>     
        </Row>        
        <Row>
          <Col sm={4}></Col>
          <Col sm={4}></Col>
            <Col sm={4}>
              <Form.Group className="mb-3 mb-3 mb-3 ">
                <Button variant="primary" type="submit" disabled={loading}>
                  {t('Registrar')}
                </Button>
              </Form.Group>
            </Col>
          </Row>
      </VerticalForm>

    </>
  );
};

export default FormVoz;
