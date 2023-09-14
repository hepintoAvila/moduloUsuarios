// @flow
import React, { useContext }  from 'react';
 // components
 import { Card, Row, Col } from 'react-bootstrap';
import profileImg from '../../../../../assets/images/users/avatar-3.jpg';
import FormInput from '../../../components/FormInput';
import { SearchContext } from '../../../../../layouts/context/SearchContext';

const FormDatosAprendiz = (props) => {

    const {setNombrePrograma,nombrePrograma,nombreProgramaError,setError,validateError} = useContext(SearchContext)

    const onNombrePrograma = (e) => {
        if (e) {
              setNombrePrograma({nombrePrograma:e,valideNombrePrograma:e?.length===0 ? false : true});
              setError({...validateError,nombreProgramaError:true})
        }
    };
return (        <>
          <Card className="bg-secundary text-black">
            <Card.Body className="profile-user-box">
                <Row>
                    <Col sm={12}>
                        <Row className="align-items-center">
                            <Col className="col-auto">
                                <div className="avatar-lg">
                                    <img
                                        src={profileImg}
                                        style={{ height: '100px' }}
                                        alt=""
                                        className="rounded-circle img-thumbnail"
                                    />
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <h5 className="mt-1 mb-1 text-black">{props?.datosAprendiz?.Nombres} {props?.datosAprendiz?.Apellidos}</h5>
                                    <p className="mb-0 font-13 text-black-50"> Aprendiz</p>
                                    <ul className="mb-0 list-inline text-black">
                                        <li className="list-inline-item me-3">
                                        <h6 className="mb-1">D.I: <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Identificacion}</p></h6>
                                        </li>
                                        <li className="list-inline-item">
                                            <h6 className="mb-1">Correo: <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Email}</p></h6>
                                            
                                        </li>
                                    </ul>
                                    <ul className="mb-0 list-inline text-black">
                                        <li className="list-inline-item me-3">
                                            <h5 className="mb-1">Nombre del Programa</h5>
                                            <p className="mb-0 font-13 text-black-50"> </p>
                                        </li>
                                        <li className="list-inline-item">
                                         <p className="mb-0 font-13 text-black-50">
                                        <FormInput
                                        name="nombrePrograma"
                                        label=""
                                        type="select"
                                        containerClass="mb-3"
                                        className="form-select"
                                        key="nombrePrograma"
                                        value={nombrePrograma}
                                        onChange={(e) => onNombrePrograma(e.target.value)}
                                    >
                                        <option value="">Seleccione el tipo de Programa</option>
                                        <option value="APOYO ADMINISTRATIVO EN SALUD"> APOYO ADMINISTRATIVO EN SALUD</option>
                                        <option value="DESARROLLO DE SOFTWARE">DESARROLLO DE SOFTWARE</option>
                                    </FormInput></p>
                                    {!nombreProgramaError? <div className="isinvalid"><p className="text-white font-14 mb-3">
                                    Seleccione el tipo de Programa:
                            </p></div>:<div><h4 className="header-title mb-3">Descripción del Incidente</h4></div>}
                                        </li>
                                    </ul>                                   
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        </>
    );
};

export default FormDatosAprendiz;
