// @flow
import React  from 'react';

import classNames from 'classnames';
 
import { Row, Col, Card } from 'react-bootstrap';

//actions

import SimpleMDEReact from 'react-simplemde-editor';
// components
import { VerticalForm } from '../../../../components';
import HeaderForm from './HeaderForm';
import FileUploader from '../../components/FileUploader';
import NavbarBuscaAprendiz from './NavbarBuscaAprendiz';

const FormDatosEvidencia = (): React$Element<React$FragmentType> => {
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
      
        <HeaderForm title={'EVIDENCIAS DEL INCIDENTE'}/>
            <Card.Body>
            
                <Row className="align-items-center">
                    <Col className="col-12">
                <VerticalForm>
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
