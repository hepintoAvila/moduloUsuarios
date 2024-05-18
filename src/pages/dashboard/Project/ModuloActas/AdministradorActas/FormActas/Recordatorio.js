import React from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import SimpleMDEReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const Recordatorio = ({ id, titulo, value, onChange, handleSave, handleUpdate }) => {
    const options = {
        autosave: {
            enabled: false,
            uniqueId: id,
        },
        toolbar: [
            'bold', 'italic', 'heading', '|',
            'quote', 'unordered-list', 'ordered-list', '|',
            'link', 'image', '|',
            {
                name: 'save',
                action: () => handleSave(id),
                className: 'fa fa-save',
                title: 'Guardar',
            },
            {
                name: 'update',
                action: () =>handleUpdate(id),
                className: 'fa fa-refresh',
                title: 'Actualizar',
            }
        ],
    };

    const handleEditorChange = (value) => {
        onChange(id, value);
    };
//console.log('value',value)
    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Body>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label htmlFor={`descripcion-${id}`} column md={12}>
                                    {titulo}
                                </Form.Label>
                                <Col md={12}>
                                    <SimpleMDEReact
                                        id={id}
                                        value={value}
                                        options={options}
                                        onChange={handleEditorChange}
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

export default Recordatorio;
