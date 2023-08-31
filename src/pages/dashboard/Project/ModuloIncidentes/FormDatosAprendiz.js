// @flow
import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Redirect, Link } from 'react-router-dom';
import { Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//actions
import { resetAuth, signupUser } from '../../../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../../../components';
import TopbarSearch from '../../../../components/TopbarSearch';
 
//import { DashboardContext } from '../../../../layouts/context/DashboardContext';
const HeaderForm = () => {
    const colors = ['secondary'];

    return (
        <Row>
            {colors.map((color, index) => {
                return (
                    <Col md={12} key={index}>
                        <Card className={classNames('text-white', [`bg-${color}`])}>
                            <Card.Body>
                                <Card.Title as="h5">DATOS DEL APRENDIZ</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
};
const FormDatosAprendiz = (): React$Element<React$FragmentType> => {
    /*
    const {setitemsMenuPrincipal } = useContext(DashboardContext)

    const handleClick = (url) => {
    
        setitemsMenuPrincipal('/ModuloIncidentes');
            const menuitems = window.location.hash.split('#/')[1];
            const [seccion] = menuitems?.split('/');
            const obj = {principal:seccion.length===0 ? 'dashboard/ModuloIncidentes':seccion, seccion: url}
            sessionStorage.setItem('ITEM_SELECT', JSON.stringify({ tipo: obj.principal, menu: obj.seccion }));
         const urls = seccion.length===0 ? 'dashboard/ModuloIncidentes/'+seccion+''+url:'/'+seccion+'/'+url
          return window.location.hash = urls;
    
      };
      */
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { loading, userSignUp, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp,
    }));

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            fullname: yup.string().required(t('Please enter Fullname')),
            email: yup.string().required('Please enter Email').email('Please enter valid Email'),
            password: yup.string().required(t('Please enter Password')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        dispatch(signupUser(formData['fullname'], formData['email'], formData['password']));
    };
    const SearchResults = [
        {
            id: 1,
            title: 'Analytics Report',
            icon: 'uil-notes',
            redirectTo: '/',
        },
        {
            id: 2,
            title: 'How can I help you?',
            icon: 'uil-life-ring',
            redirectTo: '/',
        },
        {
            id: 3,
            icon: 'uil-cog',
            title: 'User profile settings',
            redirectTo: '/',
        },
    ];
    return (
        <>

        <Card className={classNames('widget-flat')}>
        <div className={`navbar-custom`}>
        <Row>
        <Col xl={4}><div className="mb-3 mb-0 text-center"><TopbarSearch items={SearchResults} /></div></Col>  
        <Col xl={8}><div className="mb-3 mb-0 text-center btnhistorial">
          <Button variant="primary" type="submit">{'Consultar Historial'}</Button> </div></Col>
        </Row>
        </div>
        <HeaderForm title={'DATOS DEL APRENDIZ'}/>
            <Card.Body>
            
                <Row className="align-items-center">
                    <Col className="col-12">
                <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
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
            </Card.Body>
        </Card>
        </>
    );
};

export default FormDatosAprendiz;
