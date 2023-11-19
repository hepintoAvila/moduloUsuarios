// @flow
// components
import { Row, Col } from 'react-bootstrap';
import profileImg from '../../../../../assets/images/users/avatar-3.jpg';
//import { useContext, useEffect } from 'react';
//import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
//import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';

const DatosAprendiz = (props) => {
    const datosAprendiz = props?.datosAprendizDatos?.datosAprendiz[0];
    console.log('',datosAprendiz)

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
                                    {datosAprendiz?.nombres} {datosAprendiz?.apellidos}
                                </h5>
                                <p className="mb-0 font-13 text-black-50">{datosAprendiz?.Rol}</p>
                                <ul className="mb-0 list-inline text-black">
                                    <li className="list-inline-item me-3">
                                        <h6 className="mb-1">
                                            D.I:{' '}
                                            <p className="mb-0 font-13 text-black-50">
                                                {datosAprendiz?.identificacion ? datosAprendiz?.identificacion : ''}
                                            </p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item me-3">
                                        <h6 className="mb-1">
                                            Nombres y Apellidos:{' '}
                                            <p className="mb-0 font-13 text-black-50">
                                                {datosAprendiz?.nombres ? datosAprendiz?.nombres : ''}
                                            </p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Correo:{' '}
                                            <p className="mb-0 font-13 text-black-50">
                                                {datosAprendiz?.Email ? datosAprendiz?.email : ''}
                                            </p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Ficha No:{' '}
                                            <p className="mb-0 font-13 text-black-50">
                                                {datosAprendiz?.direccion ? datosAprendiz?.direccion : ''}
                                            </p>
                                        </h6>
                                    </li>
                                </ul>
                                <ul className="mb-0 list-inline text-black">
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Telefono:{' '}
                                            <p className="mb-0 font-13 text-black-50">{datosAprendiz?.telefono}</p>
                                        </h6>
                                    </li>

                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Jornada:{' '}
                                            <p className="mb-0 font-13 text-black-50">{datosAprendiz?.jornada ? datosAprendiz?.jornada : 'MAÑANA'}</p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Etapa: <p className="mb-0 font-13 text-black-50">{datosAprendiz?.etapa ? datosAprendiz?.etapa:'LECTIVA'}</p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Ficha No.:{' '}
                                            <p className="mb-0 font-13 text-black-50">{datosAprendiz?.ficha ? datosAprendiz?.ficha : '002122222'}</p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Municipo:{' '}
                                            <p className="mb-0 font-13 text-black-50">{datosAprendiz?.municipio ? datosAprendiz?.municipio: 'BUCARAMANGA'}</p>
                                        </h6>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul className="mb-0 list-inline text-black">
                                    <li className="list-inline-item me-3">
                                        <h5 className="mb-1">PROGRAMA DE FORMACIÓN</h5>
                                        <p className="mb-0 font-13 text-black-50">{datosAprendiz?.programaFormacion} </p>
                                    </li>
                                    <li className="list-inline-item">
                                        <p className="mb-0 font-13 text-black-50"></p>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row></Row>
        </>
    );
};

export default DatosAprendiz;
