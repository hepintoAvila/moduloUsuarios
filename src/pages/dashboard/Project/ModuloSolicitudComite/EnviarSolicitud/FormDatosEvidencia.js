// @flow
import React, { useContext }  from 'react';
import { Row, Card } from 'react-bootstrap';

//actions
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// components
import { VerticalForm} from '../../../../../components';
 import { SearchContext } from '../../../../../layouts/context/SearchContext';

const FormDatosEvidencia = (): React$Element<React$FragmentType> => {
    const {setDescripcion,descripcionError,setLoading,validateError,setError} = useContext(SearchContext)
       /**
     * On editor body change
     */
       const onEditorStateChange = (e) => {
                const desc = e?.blocks[0]?.text;
                setDescripcion({descripcion:desc,valideDescripcion:desc?.length===0 ? false : true});
                setLoading(false)
                setError({...validateError,descripcionError:true})
             };
    return (
        <>
            <Card className={'widget-flat'}>
            <Card.Body>
                  <Row className="align-items-center">
                <VerticalForm>
                <Row>
                <div><h4 className="header-title mb-3">Hechos constitutivos de la presunta falta:</h4></div>
                <Editor
                                        wrapperClassName="rich-editor-wrapper"
                                        editorClassName="rich-editor"

                                        toolbar={{
                                            options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link'],
                                            inline: { inDropdown: true },
                                            list: { inDropdown: true },
                                            textAlign: { inDropdown: true },
                                            link: { inDropdown: true },
                                        }}
                                        label={'Descripción de los hechos concecutivos de la presunta falta:'}
                                        onChange={(e) => {onEditorStateChange(e)
                                        }}
                                    />
                                   {!descripcionError? <div className="isinvalid"><p className="text-white font-14 mb-3">
                                     Por favor, Narre aqui los hechos:
                            </p></div>:<div><h4 className="header-title mb-3">.</h4></div>}
                     </Row>
                </VerticalForm>
                </Row>
            </Card.Body>
        </Card>
    </>
    );
};

export default FormDatosEvidencia;
