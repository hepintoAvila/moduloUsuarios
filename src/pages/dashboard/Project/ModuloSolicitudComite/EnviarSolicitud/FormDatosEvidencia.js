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
     const {setDescripcion,descripcionError,setLoading,validateError,setError} = useContext(SearchContext)
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

        <Card className={'widget-flat'}>
      
        <HeaderForm title={'HECHOS CONSTITUTIVOS'}/>

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
                            </p></div>:<div><h4 className="header-title mb-3"></h4></div>}
                    <Card>
                    {!descripcionError? <div className="isinvalid"><p className="text-white font-14 mb-3">
                                Por favor, Narre aqui los hechos:
                            </p></div>:<div><h4 className="header-title mb-3">Descripción del Incidente</h4></div>}

                        <Card.Body>
                            <SimpleMDEReact id={1} options={options} label={'Atentamente le informamos que de conformidad con el Procedimiento Ejecución de la Formación Profesional en su etapa electiva y/o el Reglamento para Aprendices del SENA, se le hace este llamado de Atención por el siguiente motivo:'} onChange={(e) => {
                                    setDescripcion({descripcion:e,valideDescripcion:e?.length===0 ? false : true});
                                    setLoading(false)
                                    setError({...validateError,descripcionError:true})
                                }} />
                                   
                        </Card.Body>
                    </Card>
                     </Row>
                </VerticalForm>
                </Row>
            </Card.Body>
        </Card>
    </>
    );
};

export default FormDatosEvidencia;
