// @flow
import React, { useContext, useState }  from 'react';
 // components
 import { Row, Col } from 'react-bootstrap';
import profileImg from '../../../../../assets/images/users/avatar-3.jpg';
import FormInput from '../../../components/FormInput';
import { SearchContext } from '../../../../../layouts/context/SearchContext';

const FormDatosAprendiz = (props) => {

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
                                <h4 className="header-title mb-3 mt-3">DATOS BÁSICOS DEL APRENDIZ</h4></div>
                                    <div>
                                    <h5 className="mt-1 mb-1 text-black">{props?.datosAprendiz?.Nombres} {props?.datosAprendiz?.Apellidos}</h5>
                                    <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Rol}</p>
                                    <ul className="mb-0 list-inline text-black">
                                        <li className="list-inline-item me-3">
                                        <h6 className="mb-1">D.I: <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Identificacion}</p></h6>
                                        </li>
                                        <li className="list-inline-item">
                                            <h6 className="mb-1">Correo: <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Email}</p></h6>
                                            
                                        </li>
                                        <li className="list-inline-item">
                                            <h6 className="mb-1">Dirección: <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Direccion}</p></h6>
                                            
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
                                    <h4 className="header-title mb-1 mp-2">SANCIONES ANTERIORES:</h4></div>
                                    <ul className="mb-0 list-inline text-black">
                                        <li className="list-inline-item me-3">
                                        <h6 className="mb-1"> <p className="mb-0 font-13 text-black-50">#Falta Academicas:</p><p className="mb-0 font-13 text-black-50">
                                        <input
                                        name="faltaAcademica"
                                        value={fallas[0]?.faltaAcademica}
                                        placeholder={props?.datosAprendiz?.Academica}
                                        type="number"
                                        containerClass="mb-3 font-weight-bold me-3"
                                        className="inputAprendiz"
                                        key="faltaAcademica"
                                        onChange={(e) => setFallas(
                                            [{
                                            ...fallas[0], faltaAcademica: e.target.value,
                                          }])}
                                          /></p></h6>
                                        </li>
                                        <li className="list-inline-item"></li>
                                        <li className="list-inline-item">
                                        <h6 className="mb-1"> <p className="mb-0 font-13 text-black-50">#Falta Disciplinarias:</p><p className="mb-0 font-13 text-black-50">
                                       <input
                                        name="faltaDisciplinaria"
                                        value={fallas[0]?.faltaDisciplinaria}
                                        placeholder={props?.datosAprendiz?.Disciplinaria}
                                        type="number"
                                        containerClass="mb-3 font-weight-bold me-3"
                                        className="inputAprendiz"
                                        key="faltaDisciplinaria"
                                        onChange={(e) => setFallas([{
                                            ...fallas[0], faltaDisciplinaria: e.target.value,
                                          }])}
                                          /></p></h6>
                                            
                                        </li>
                                        <li className="list-inline-item">
                                        <h6 className="mb-1"> <p className="mb-0 font-13 text-black-50">#Inasistencias:</p><p className="mb-0 font-13 text-black-50"><input
                                        name="faltaInasistencias"
                                        value={fallas[0]?.faltaInasistencias}
                                        type="number"
                                        containerClass="mb-3 font-weight-bold me-3"
                                        className="inputAprendiz"
                                        key="faltaInasistencias"
                                        placeholder={props?.datosAprendiz?.Academica}
                                        onChange={(e) => setFallas([{
                                            ...fallas[0], faltaInasistencias: e.target.value,
                                          }])}
                                          /></p></h6>
                                        </li>
                                    </ul>    
                                    <ul className="mb-0 list-inline text-black">
                                        <li className="list-inline-item me-3">
                                        <h6 className="mb-1"> <p className="mb-0 font-13 text-black-50">#LLamado Verbal:</p><p className="mb-0 font-13 text-black-50"><input
                                        name="faltaVerbal"
                                        value={fallas[0]?.faltaVerbal}
                                        type="number"
                                        containerClass="mb-3 font-weight-bold me-3"
                                        className="inputAprendiz"
                                        key="faltaVerbal"
                                        onChange={(e) => setFallas([{
                                            ...fallas[0], faltaVerbal: e.target.value,
                                          }])}
                                          /></p></h6>
                                        </li>
                                        
                                        <li className="list-inline-item"></li><li className="list-inline-item"></li>
                                        <li className="list-inline-item">
                                        <h6 className="mb-1"> <p className="mb-0 font-13 text-black-50">#LLamado Escrito:</p><p className="mb-0 font-13 text-black-50"><input
                                        name="faltaEscrito"
                                        value={fallas[0]?.faltaEscrito}
                                        type="number"
                                        containerClass="mb-3 font-weight-bold me-3"
                                        className="inputAprendiz"
                                        key="faltaEscrito"
                                        placeholder={props?.datosAprendiz?.Academica}
                                        onChange={(e) => setFallas([{
                                            ...fallas[0], faltaEscrito: e.target.value,
                                          }])}
                                          /></p></h6>
                                        </li>
                                    </ul>                                                                      
                                    <div>
                                   
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

export default FormDatosAprendiz;
