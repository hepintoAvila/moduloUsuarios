// @flow
import React  from 'react';
import classNames from 'classnames';
 import { Row, Col, Card} from 'react-bootstrap';
// components
import { VerticalForm, FormInput } from '../../../../components';
 
import HeaderForm from './HeaderForm';
 
//import { DashboardContext } from '../../../../layouts/context/DashboardContext';

const FormDatosIncidente = (): React$Element<React$FragmentType> => {

    return (
        <>

        <Card className={classNames('widget-flat')}>
 
        <HeaderForm title={'DATOS DEL INCIDENTE'}/>
            <Card.Body>
            
                <Row className="align-items-center">
                    <Col className="col-12">
                <VerticalForm>
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
