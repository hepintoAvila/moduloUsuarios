// @flow
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
 
import { Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//actions
import { resetAuth, signupUser } from '../../../../redux/actions';
import SimpleMDEReact from 'react-simplemde-editor';
// components
import { VerticalForm, FormInput } from '../../../../components';
import TopbarSearch from '../../../../components/TopbarSearch';
import HeaderForm from './HeaderForm';
import FileUploader from '../../components/FileUploader';

const FormDatosEvidencia = (): React$Element<React$FragmentType> => {

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
    const delay = 1000;
    const options = {
        autosave: {
            enabled: true,
            uniqueId: 1,
            delay,
        },
    };
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
        <HeaderForm title={'EVIDENCIAS DEL INCIDENTE'}/>
            <Card.Body>
            
                <Row className="align-items-center">
                    <Col className="col-12">
                <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-3">Descripcrón del Incidente</h4>
                            <p className="text-muted font-14 mb-3">
                                Narre los hechos:
                            </p>

                            <SimpleMDEReact id={1} options={options} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-3">Subir documentos</h4>

                            <p className="text-muted font-13 m-b-30">
                               Cargue aqui las evidencias del incidente
                            </p>

                            <FileUploader
                                onFileUpload={(files) => {
                                    console.log(files);
                                }}
                            />
                        </Card.Body>
                    </Card>
                    </Col>
                    </Row>
                </VerticalForm>
                </Col>
                </Row>
            </Card.Body>
        </Card>
        </>
    );
};

export default FormDatosEvidencia;
