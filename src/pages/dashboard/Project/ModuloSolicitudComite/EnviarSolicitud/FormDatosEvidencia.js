// @flow
import React, { useContext }  from 'react';
import { Row, Card } from 'react-bootstrap';

//actions
import SimpleMDEReact from 'react-simplemde-editor';
// components
import { VerticalForm} from '../../../../../components';
 import HeaderForm from '../Components/HeaderForm';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
 
const FormDatosEvidencia = (): React$Element<React$FragmentType> => {
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
                    <Card>
                    {!descripcionError? <div className="isinvalid"><p className="text-white font-14 mb-3">
                                Por favor, Narre aqui los hechos:
                            </p></div>:<div><h4 className="header-title mb-3"></h4></div>}

                        <Card.Body>
                            <SimpleMDEReact id={1} options={options} label={'Descripción de los hechos concecutivos de la presunta falta:'} onChange={(e) => {
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
