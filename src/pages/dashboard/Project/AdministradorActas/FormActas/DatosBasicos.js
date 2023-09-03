/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import FormInput from '../../../components/FormInput';
//import { DashboardContext } from '../../../../layouts/context/DashboardContext';
//import { usePermisos } from '../../../../hooks/usePermisos';

const DatosBasicos = () => {
    const [singleSelections, setSingleSelections] = useState([]);
    //const { tipo,itemUrl } = useContext(DashboardContext)

    //const { permisos } = usePermisos(tipo);

    return (
        <React.Fragment>
            <Row>

                <Col lg={6}>
                    <Card>
                        <Card.Body>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label htmlFor="exampleEmail" column md={3}>
                                    Coordinador:
                                </Form.Label>
                                <Col md={9}>
                                    <Typeahead
                                        id="coordinador"
                                        labelKey="label"
                                        multiple={false}
                                        onChange={setSingleSelections}
                                        options={[
                                            { id: 1, value: 'María Buitrago', label: 'María Buitrago' },
                                            { id: 2, value: 'Yolanda Rojas', label: 'Yolanda Rojas' },
                                            { id: 3, value: 'Alexandra Gil', label: 'Alexandra Gil' },
                                        ]}
                                        placeholder="Seleccione el Coordinador..."
                                        selected={singleSelections}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label htmlFor="codActa" column md={3}>
                                    Número de Acta:
                                </Form.Label>
                                <Col md={9}>
                                    <Form.Control
                                        type="text"
                                        name="codActa"
                                        id="codActa"
                                        placeholder="COD001"
                                        defaultValue="COD001"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label htmlFor="examplerePassword" column md={3}>
                                Número de Resolucción:
                                </Form.Label>
                                <Col md={9}>
                                <Form.Control
                                        type="text"
                                        name="numResolucion"
                                        id="numResolucion"
                                        placeholder=""
                                        defaultValue=""
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label htmlFor="examplerePassword" column md={3}>
                                Vcto Recurso Reposición *Resolución*:
                                </Form.Label>
                                <Col md={9}>
                                <Form.Control
                                        type="text"
                                        name="numResolucion"
                                        id="numResolucion"
                                        placeholder=""
                                        defaultValue=""
                                    />
                                </Col>
                            </Form.Group>
                        </Card.Body>

                    </Card>
                </Col>
                <Col lg={6}>
                    <Card>
                        <Card.Body>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label htmlFor="exampleEmail" column md={3}>
                                Novedad registrada:
                                </Form.Label>
                                <Col md={9}>
                                <FormInput
                                    label=""
                                    type="textarea"
                                    name="novedad"
                                    rows="5"
                                    containerClass={'mb-3'}
                                    key="novedad"
                                />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label htmlFor="exampleEmail" column md={3}>
                                Recursos o Reposiciones:
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

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label htmlFor="examplerePassword" column md={3}>
                                Verificación:
                                </Form.Label>
                                <Col md={9}>
                                <Form.Control
                                        type="text"
                                        name="verificacion"
                                        id="verificacion"
                                        placeholder=""
                                        defaultValue=""
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
DatosBasicos.defaultProps = {
    itemsmenu: '/',
};
export default DatosBasicos;
