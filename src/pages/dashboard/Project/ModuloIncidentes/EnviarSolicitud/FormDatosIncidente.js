// @flow
import React, { useState }  from 'react';
import classNames from 'classnames';
 import { Row, Col, Card} from 'react-bootstrap';
// components
import { VerticalForm,FormInput } from '../../../../../components';
 
 
import HyperDatepicker from '../../../../../components/Datepicker';
import HeaderForm from '../Components/HeaderForm';
 
//import { DashboardContext } from '../../../../layouts/context/DashboardContext';

const FormDatosIncidente = (): React$Element<React$FragmentType> => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    /*
     * handle date change
     */
    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };
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
                        containerClass="mb-3 font-weight-bold"
                        className="form-select"
                        key="tipoLLamado"
                        >
                        <option>Seleccione...</option>
                        <option>GRAVE</option>
                        <option>MEDIO</option>
                        <option> -Verbal</option>
                        <option> -Escrito</option>
                        <option>BAJA</option>
                        <option> -Verbal</option>
                        <option> -Escrito</option>
                </FormInput>
                <div className="mb-3">
                            <label>Fecha y Hora</label> <br />
                            <HyperDatepicker
                                hideAddon={true}
                                showTimeSelect
                                timeFormat="HH:mm"
                                tI={60}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="time"
                                value={selectedDate}
                                onChange={(date) => {
                                    onDateChange(date);
                                }}
                            />
                        </div>
                </VerticalForm>
                </Col>
                </Row>
            </Card.Body>
        </Card>
        </>
    );
};

export default FormDatosIncidente;
