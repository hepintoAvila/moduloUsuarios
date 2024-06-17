// @flow
import React, { useContext } from 'react';
import { Row, Card, Form } from 'react-bootstrap';
import SimpleMDEReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
//actions
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// components

import { SearchContext } from '../../../../../layouts/context/SearchContext';
import { DatosSolicitudContext } from '../../../../../layouts/context/DatosComiteContext';

const FormDatosEvidencia = (props) => {
  const { setDescripcion, descripcionError, setLoading, validateError, setError } = useContext(SearchContext)
  const { itemsSolicitud, setItemsSolicitud } = useContext(DatosSolicitudContext);
  /**
* On editor body change
*/


  const onEditorStateChange = (e) => {


    setDescripcion({ descripcion: e, valideDescripcion: e?.length === 0 ? false : true });
    setLoading(false)
    setError({ ...validateError, descripcionError: true })
    setItemsSolicitud([
      {
        ...itemsSolicitud[0],
        descripcion: e,
      },
    ]);

  };
  return (
    <>
      <Card className={'widget-flat'}>
        <Card.Body>
          <Row className="align-items-center">
            <Form.Group as={Row} className="mb-3">
              <Row>
                <div><h4 className="header-title mb-3">Hechos constitutivos de la presunta falta:</h4></div>
                <SimpleMDEReact
                  id={props?.id}
                  value={props?.hechos}
                  options={props?.options}
                  onChange={onEditorStateChange}
                />
                {!descripcionError ? <div className="hederComponente"><p className="text-black font-14 mb-3">
                  Por favor, Narre aqui los hechos:
                </p></div> : <div><h4 className="header-title mb-3">.</h4></div>}
              </Row>
            </Form.Group>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default FormDatosEvidencia;
