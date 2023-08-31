// @flow
import React from 'react';
import classNames from 'classnames';
import { Button,  Row, Col, Card } from 'react-bootstrap';

// components
import { VerticalForm, FormInput } from '../../../../components';
import { useTranslation } from 'react-i18next';
import HeaderForm from './HeaderForm';
import NavbarBuscaAprendiz from './NavbarBuscaAprendiz';
 
const FormDatosAprendiz = (): React$Element<React$FragmentType> => {
    const { t } = useTranslation();

    return (
        <>

        <Card className={classNames('widget-flat')}>
        <NavbarBuscaAprendiz/>
        <HeaderForm title={'DATOS DEL APRENDIZ'}/>
            <Card.Body>
            
                <Row className="align-items-center">
                    <Col className="col-12">
                <VerticalForm>
                    <FormInput
                        label={t('Nombres')}
                        type="text"
                        name="Nombres"
                        placeholder={t('Nombres')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Apellidos')}
                        type="text"
                        name="Apellidos"
                        placeholder={t('Apellidos')}
                        containerClass={'mb-3'}
                    />
                     <FormInput
                        label={t('Identificacion')}
                        type="text"
                        name="Identificacion"
                        placeholder={t('Identificacion')}
                        containerClass={'mb-3'}
                    />    
                      <FormInput
                        label={t('Celular')}
                        type="text"
                        name="Celular"
                        placeholder={t('Celular')}
                        containerClass={'mb-3'}
                    />                                    
                    <FormInput
                        label={t('Email address')}
                        type="email"
                        name="email"
                        placeholder={t('Enter your email')}
                        containerClass={'mb-3'}
                    />


                </VerticalForm>
                </Col>
                </Row>
                <Row>
                <Col className="col-12">
                <Button variant="primary" type="submit">{'Consultar Historial'}</Button> 
                </Col>
                </Row>
            </Card.Body>
        </Card>
        </>
    );
};

export default FormDatosAprendiz;
