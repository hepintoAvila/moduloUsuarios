// @flow
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { Button,  Row, Col, Card } from 'react-bootstrap';

// components
 
import { useTranslation } from 'react-i18next';
 
import NavbarBuscaAprendiz from '../Components/NavbarBuscaAprendiz';
import { VerticalForm,FormInput } from '../../../../../components';
import HeaderForm from '../Components/HeaderForm';
import { useAdminUsuarios } from '../../../../../hooks/useAdminUsuarios';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
 
 
const FormDatosAprendiz = (props): React$Element<React$FragmentType> => {
    const {itemsAprendices,query} = useAdminUsuarios()
    const {itemsOptionAprendiz} = useContext(SearchContext)
    const apredizDatos = itemsAprendices?.data?.aprencices || [];




    const { t } = useTranslation();
    const { setitemsMenuPrincipal } = useContext(DashboardContext)
    const toggleModal= () => {
   
        const menuitems = window.location.hash.split('#/')[1];
        const [seccion] = menuitems?.split('/');
        setitemsMenuPrincipal(seccion)
        return window.location.hash = `dashboard/ModuloIncidentes/ConsultarAprendiz`;   
      }


      useEffect(() => {
        query('ModuloIncidentes','Aprendiz',[{opcion:'listaAprendices',obj:'aprendices'}]);
      }, [query]);

 
    //console.log('itemsOptionAprendiz',itemsOptionAprendiz) 
    return (
        <>
        <Card className={classNames('widget-flat')}>
        <NavbarBuscaAprendiz handleClick={props.handleClick} nivel={3} data={apredizDatos} selectedOption={`${itemsOptionAprendiz?.Nombres?.toUpperCase()} ${itemsOptionAprendiz?.Apellidos?.toUpperCase()}`}/>
        <HeaderForm title={'DATOS DEL APRENDIZ'}/>
            <Card.Body>
            
                <Row className="align-items-center">
                    <Col className="col-12">
                <VerticalForm>
                    <FormInput
                        label={t('Nombres')}
                        type="text"
                        name="Nombres"
                        placeholder={itemsOptionAprendiz?.Nombres}
                        containerClass={'mb-3'}
                        disabled
                    />
                    <FormInput
                        label={t('Apellidos')}
                        type="text"
                        name="Apellidos"
                        placeholder={itemsOptionAprendiz?.Apellidos}
                        containerClass={'mb-3'}
                        disabled
                    />
                     <FormInput
                        label={t('Identificacion')}
                        type="text"
                        name="Identificacion"
                        placeholder={itemsOptionAprendiz?.Identificacion}
                        containerClass={'mb-3'}
                        disabled
                    />    
                      <FormInput
                        label={t('Celular')}
                        type="text"
                        name="Celular"
                        placeholder={itemsOptionAprendiz?.Celular}
                        containerClass={'mb-3'}
                        disabled
                    />                                    
                    <FormInput
                        label={t('Email address')}
                        type="email"
                        name="Email"
                        placeholder={itemsOptionAprendiz?.Email}
                        containerClass={'mb-3'}
                        disabled
                    />


                </VerticalForm>
                </Col>
                </Row>
                <Row>
                <Col className="col-12">
                <Button variant="primary" type="submit" onClick={() =>toggleModal()}>{'Consultar Historial'}</Button> 
                </Col>
                </Row>
            </Card.Body>
        </Card>
        </>
    );
};

export default FormDatosAprendiz;
