/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, {  useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import FormInput from '../../../components/FormInput';
//import { DashboardContext } from '../../../../layouts/context/DashboardContext';
//import { usePermisos } from '../../../../hooks/usePermisos';

const Reglas = () => {
    const [singleSelections, setSingleSelections] = useState([]);
    //const { tipo,itemUrl } = useContext(DashboardContext)

    //const { permisos } = usePermisos(tipo);

    return (
        <React.Fragment>
            <Row>

                <Col lg={12}>
                    <Card>
                        <Card.Body>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label htmlFor="exampleEmail" column md={3}>
                                    Buscar Regla:
                                </Form.Label>
                                <Col md={9}>
                                    <Typeahead
                                        id="coordinador"
                                        labelKey="label"
                                        multiple={false}
                                        onChange={setSingleSelections}
                                        options={[
                                            { id: 1, value: 'Regla No.1', label: 'Regla No.1' },
                                            { id: 2, value: 'Regla No.2', label: 'Regla No.2' },
                                            { id: 3, value: 'Regla No.3', label: 'Regla No.3' },
                                        ]}
                                        placeholder="Seleccione el Coordinador..."
                                        selected={singleSelections}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label htmlFor="codActa" column md={3}>
                                    Regla:
                                </Form.Label>
                                <Col md={9}>
                                <FormInput
                                    label=""
                                    type="textarea"
                                    name="recursos"
                                    rows="5"
                                    containerClass={'mb-3'}
                                    key="novedad"
                                />
                                </Col>
                            </Form.Group>
                        </Card.Body>

                    </Card>
                </Col>
                
            </Row>
        </React.Fragment>
    );
};
Reglas.defaultProps = {
    itemsmenu: '/',
};
export default Reglas;
