// @flow
import React, { useContext }  from 'react';
 // components
 import { Row, Col, } from 'react-bootstrap';
import profileImg from '../../../../../assets/images/users/avatar-3.jpg';
import FormInput from '../../../components/FormInput';
import { SearchContext } from '../../../../../layouts/context/SearchContext';


const DatosAprendiz = (props) => {
    const {setNombrePrograma,nombrePrograma,nombreProgramaError,setError,validateError,fallas, setFallas} = useContext(SearchContext)

    const onNombrePrograma = (e) => {
        if (e) {
              setNombrePrograma({nombrePrograma:e,valideNombrePrograma:e?.length===0 ? false : true});
              setError({...validateError,nombreProgramaError:true})
        }
    };
return (
<>

                <Row  className="cardAprendiz text-black">
                    <Col sm={12}>
                        <Row className="align-items-center cardAprendiz">
                            <Col className={`col-auto ${props?.swEdit===1 ? 'fotoUserSw' : 'fotoUser'}`}>
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
                                <h4 className="header-title mb-3 mt-3">DATOS BÁSICOS DEL APRENDIZ</h4></div>
                                    <div>
                                    <h5 className="mt-1 mb-1 text-black">{props?.datosAprendiz?.Nombres} {props?.datosAprendiz?.Apellidos}</h5>
                                    <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Rol}</p>
                                    <ul className="mb-0 list-inline text-black">
                                        <li className="list-inline-item me-3">
                                        <h6 className="mb-1">D.I: <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Identificacion? props?.datosAprendiz?.Identificacion:'77027207'}</p></h6>
                                        </li>
                                        <li className="list-inline-item me-3">
                                        <h6 className="mb-1">Nombres y Apellidos: <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Nombres? props?.datosAprendiz?.Nombres:'Holmes Eduardo Pinto Rojas'}</p></h6>
                                        </li>
                                        <li className="list-inline-item">
                                            <h6 className="mb-1">Correo: <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Email? props?.datosAprendiz?.Email:'hosmmerpinto@gmail.com'}</p></h6>

                                        </li>
                                        <li className="list-inline-item">
                                            <h6 className="mb-1">Ficha No: <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Direccion? props?.datosAprendiz?.Direccion : '2561326'}</p></h6>

                                        </li>
                                        </ul>
                                        <ul className="mb-0 list-inline text-black">
                                        <li className="list-inline-item">
                                            <h6 className="mb-1">Telefono: <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Telefono}</p></h6>
                                        </li>

                                        <li className="list-inline-item">
                                            <h6 className="mb-1">Jornada: <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Jornada}</p></h6>
                                        </li>
                                        <li className="list-inline-item">
                                            <h6 className="mb-1">Etapa: <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Etapa}</p></h6>
                                        </li>
                                        <li className="list-inline-item">
                                            <h6 className="mb-1">Ficha No.: <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Ficha}</p></h6>
                                        </li>
                                        <li className="list-inline-item">
                                            <h6 className="mb-1">Municipo: <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Municipio}</p></h6>
                                        </li>
                                    </ul>
                                    </div>
                                    <div>
                                   {props.swEdit===1 ? <label className='editTitulos'><i class="mdi mdi-account-check"></i>{props?.edit[0]?.nombrePrograma}</label> :''}
                                    <ul className="mb-0 list-inline text-black">
                                        <li className="list-inline-item me-3">
                                            <h5 className="mb-1">PROGRAMA DE FORMACIÓN</h5>
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
                                        <option value="">Seleccione programa de formación</option>
                                        <option value="APOYO ADMINISTRATIVO EN SALUD"> APOYO ADMINISTRATIVO EN SALUD</option>
                                        <option value="DESARROLLO DE SOFTWARE">DESARROLLO DE SOFTWARE</option>
                                        </FormInput></p>

                                        </li>
                                    </ul>

                            </div>

                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                {!nombreProgramaError? <div className="isinvalid"><p className="text-white font-14 mb-3"></p></div>:''}
               </Row>


        </>
    );
};

export default DatosAprendiz;
