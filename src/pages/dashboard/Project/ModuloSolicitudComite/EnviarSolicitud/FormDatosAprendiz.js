// @flow
import React from 'react';
// components
import { Row, Col } from 'react-bootstrap';
import profileImg from '../../../../../assets/images/users/avatar-3.jpg';

const FormDatosAprendiz = (props) => {

    return (
        <>
            <Row className="cardAprendiz text-black">
                <Col sm={12}>
                    <Row className="align-items-center cardAprendiz">
                        <Col className={`col-auto ${props?.swEdit === 1 ? 'fotoUserSw' : 'fotoUser'}`}>
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
                                <h4 className="header-title mb-3 mt-3">DATOS BÁSICOS DEL APRENDIZ</h4>
                            </div>
                            <div>
                                <h5 className="mt-1 mb-1 text-black">
                                    {props?.datosAprendiz?.Nombres} {props?.datosAprendiz?.Apellidos}
                                </h5>
                                <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Rol}</p>
                                <ul className="mb-0 list-inline text-black">
                                    <li className="list-inline-item me-3">
                                        <h6 className="mb-1">
                                            D.I:{' '}
                                            <p className="mb-0 font-13 text-black-50">
                                                {props?.datosAprendiz?.Identificacion}
                                            </p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Correo:{' '}
                                            <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Email}</p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Dirección:{' '}
                                            <p className="mb-0 font-13 text-black-50">
                                                {props?.datosAprendiz?.Direccion}
                                            </p>
                                        </h6>
                                    </li>
                                </ul>
                                <ul className="mb-0 list-inline text-black">
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Telefono:{' '}
                                            <p className="mb-0 font-13 text-black-50">
                                                {props?.datosAprendiz?.Telefono}
                                            </p>
                                        </h6>
                                    </li>

                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Jornada:{' '}
                                            <p className="mb-0 font-13 text-black-50">
                                                {props?.datosAprendiz?.Jornada}
                                            </p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Etapa:{' '}
                                            <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Etapa}</p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Ficha No.:{' '}
                                            <p className="mb-0 font-13 text-black-50">{props?.datosAprendiz?.Ficha}</p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Municipo:{' '}
                                            <p className="mb-0 font-13 text-black-50">
                                                {props?.datosAprendiz?.Municipio}
                                            </p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Programa de Formación:{' '}
                                            <p className="mb-0 font-13 text-black-50">
                                                {props?.datosAprendiz?.nombrePrograma}
                                            </p>
                                        </h6>
                                    </li>
                                </ul>
                                <br/>
                                <h4 className="header-title mb-1 mp-2">SANCIONES:</h4>
                            </div>
                            <ul className="mb-0 list-inline text-black">
                                <li className="list-inline-item me-3">
                                    <h6 className="mb-1">
                                        {' '}
                                        <p className="mb-0 font-13 text-black-50">
                                            #Falta Academicas: <p className="mb-0 font-13 text-black-50"></p>
                                            <input
                                                name="faltaAcademica"
                                                disabled
                                                value={`${props?.datosAprendiz?.Academica}`}
                                                placeholder={`${props?.datosAprendiz?.Academica}`}
                                                min={`${props?.datosAprendiz?.Academica}`}
                                                max="1"
                                                type="number"
                                                containerClass="mb-3 font-weight-bold me-3"
                                                className="inputAprendiz"
                                                key="faltaAcademica"
                                                />
                                        </p>
                                    </h6>
                                </li>
                                <li className="list-inline-item"></li>
                                <li className="list-inline-item">
                                    <p className="mb-0 font-13 text-black-50">#Falta Disciplinarias:</p>
                                    <h6 className="mb-1">
                                        <input
                                            name="faltaDisciplinaria"
                                            disabled
                                            value={`${props?.datosAprendiz?.Disciplinaria}`}
                                            placeholder={props?.datosAprendiz?.Disciplinaria}
                                            min={`${props?.datosAprendiz?.Disciplinaria}`}
                                            max="1"
                                            type="number"
                                            inputmode="numeric"
                                            containerClass="mb-3 font-weight-bold me-3"
                                            className="inputAprendiz"
                                            key="faltaDisciplinaria"
                                           />
                                    </h6>
                                </li>
                                <li className="list-inline-item"></li>
                                <li className="list-inline-item">
                                    <p className="mb-0 font-13 text-black-50">#Academico Disciplinario:</p>
                                    <h6 className="mb-1">
                                        <input
                                            name="faltaDisciplinaria"
                                            disabled
                                            value={`${props?.datosAprendiz?.Disciplinaria}`}
                                            placeholder={props?.datosAprendiz?.Disciplinaria}
                                            min={`${props?.datosAprendiz?.Disciplinaria}`}
                                            max="1"
                                            type="number"
                                            inputmode="numeric"
                                            containerClass="mb-3 font-weight-bold me-3"
                                            className="inputAprendiz"
                                            key="faltaDisciplinaria"
                                           />
                                    </h6>
                                </li>
                            </ul>


                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default FormDatosAprendiz;
