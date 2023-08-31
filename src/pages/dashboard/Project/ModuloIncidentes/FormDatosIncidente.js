// @flow
import React, {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
 
import { Row, Col, Card,Form,  InputGroup, Button, Dropdown, DropdownButton} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//actions
import { resetAuth, signupUser } from '../../../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../../../components';
import TopbarSearch from '../../../../components/TopbarSearch';
import HeaderForm from './HeaderForm';
 
//import { DashboardContext } from '../../../../layouts/context/DashboardContext';

const FormDatosIncidente = (): React$Element<React$FragmentType> => {
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
        <HeaderForm title={'DATOS DEL INCIDENTE'}/>
            <Card.Body>
            
                <Row className="align-items-center">
                    <Col className="col-12">
                <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                <FormInput
                        name="tipoComite"
                        label="Seleccione el tipo de comité"
                        type="select"
                        containerClass="mb-3"
                        className="form-select"
                        key="tipoComite"
                        >
                        <option>ACADEMICO</option>
                        <option>DISCIPLINARIO</option>
                        <option>AMBIENTAL</option>
                </FormInput>
                <FormInput
                        name="tipoLLamado"
                        label="Seleccione el tipo de LLamado"
                        type="select"
                        containerClass="mb-3"
                        className="form-select"
                        key="tipoLLamado"
                        >
                        <option>GRAVE</option>
                        <option>MEDIO</option>
                        <option> -Verbal</option>
                        <option> -Escrito</option>
                        <option>AMBIENTAL</option>
                        <option> -Verbal</option>
                        <option> -Escrito</option>
                </FormInput>
                <FormInput
                                    label="Fecha del Incidente"
                                    type="date"
                                    name="fechaIncidente"
                                    containerClass={'mb-3'}
                                    key="fechaIncidente"
                                />
                                <FormInput
                                    label="Hora del Incidente"
                                    type="time"
                                    name="horaIncidente"
                                    containerClass={'mb-3'}
                                    key="horaIncidente"
                                />
                </VerticalForm>
                </Col>
                </Row>
            </Card.Body>
        </Card>
        </>
    );
};

export default FormDatosIncidente;
