// @flow
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { Button,  Row, Col, Card } from 'react-bootstrap';

// components
 
import { useTranslation } from 'react-i18next';
 
import NavbarBuscaAprendiz from '../Components/NavbarBuscaAprendiz';
import { VerticalForm,FormInput } from '../../../../../components';
import HeaderForm from '../Components/HeaderForm';
 import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
 
const FormDatosAprendiz = (props): React$Element<React$FragmentType> => {
 
    const { t } = useTranslation();
    const { setitemsMenuPrincipal } = useContext(DashboardContext)
    const toggleModal= (id) => {
         const menuitems = window.location.hash.split('#/')[1];
        const [seccion] = menuitems?.split('/');
        setitemsMenuPrincipal(seccion)
        return window.location.hash = `dashboard/ModuloIncidentes/ConsultarAprendiz?p=${id}`;   
      }
      
    return (
        <>
        <Card className={classNames('widget-flat')}>
        <NavbarBuscaAprendiz handleClick={props.handleClick} nivel={3}/>
        <HeaderForm title={'DATOS DEL APRENDIZ'}/>
            <Card.Body>
            
                <Row className="align-items-center">
                    <Col className="col-12">
                <VerticalForm>
                    <FormInput
                        label={t('Nombres')}
                        type="text"
                        name="Nombres"
                        placeholder={props?.datosAprendiz?.Nombres}
                        containerClass={'mb-3'}
                        disabled
                    />
                    
                    <FormInput
                        label={t('Apellidos')}
                        type="text"
                        name="Apellidos"
                        placeholder={props?.datosAprendiz?.Apellidos}
                        containerClass={'mb-3'}
                        disabled
                    />
                     <FormInput
                        label={t('Identificacion')}
                        type="text"
                        name="Identificacion"
                        placeholder={props?.datosAprendiz?.Identificacion}
                        containerClass={'mb-3'}
                        disabled
                    />    
                      <FormInput
                        label={t('Celular')}
                        type="text"
                        name="Celular"
                        placeholder={props?.datosAprendiz?.Celular}
                        containerClass={'mb-3'}
                        disabled
                    />                                    
                    <FormInput
                        label={t('Email address')}
                        type="email"
                        name="Email"
                        placeholder={props?.datosAprendiz?.Email}
                        containerClass={'mb-3'}
                        disabled
                    />


                </VerticalForm>
                </Col>
                </Row>
                <Row>
                <Col className="col-12">
                <Button variant="primary" type="submit" onClick={() =>toggleModal(props?.datosAprendiz?.id)}>{'Consultar Historial'}</Button> 
                </Col>
                </Row>
            </Card.Body>
        </Card>
        </>
    );
};

export default FormDatosAprendiz;
