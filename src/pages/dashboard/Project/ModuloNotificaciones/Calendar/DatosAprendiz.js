// @flow
// components
import { Row, Col } from 'react-bootstrap';
import profileImg from '../../../../../assets/images/users/avatar-3.jpg';

const DatosAprendiz = (props) => {
    const datosAprendiz = props?.datosAprendizDatos[0]?.userDetails;
    const avatar = datosAprendiz?.avatar
    const nombresApellidos = datosAprendiz?.label
    const identificacion = datosAprendiz?.identificacion
    const firstname = datosAprendiz?.firstname
    const correo = datosAprendiz?.correo
    const direccion = datosAprendiz?.direccion
    const telefono = datosAprendiz?.telefono
    const jornada = datosAprendiz?.jornada
    const etapa = datosAprendiz?.etapa
    const ficha = datosAprendiz?.ficha
    const municipio = datosAprendiz?.municipio
    const programaFormacion= datosAprendiz?.programaFormacion
    const proyectoFormativo= datosAprendiz?.proyectoFormativo
    const rol= datosAprendiz?.rol
     return (
        <>
            <Row className="cardAprendiz text-black">

                <Col sm={12}>
                    <Row className="align-items-center cardAprendiz">
                        <Col className={`col-auto ${props?.swEdit === 1 ? 'fotoUserSw' : 'fotoUser'}`}>
                            <div className="avatar-lg">
                                <img
                                    src={avatar ? avatar : profileImg}
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
                                    {nombresApellidos}
                                </h5>
                                <p className="mb-0 font-13 text-black-50">{rol}</p>
                                <ul className="mb-0 list-inline text-black">
                                    <li className="list-inline-item me-3">
                                        <h6 className="mb-1">
                                            D.I:{' '}
                                            <p className="mb-0 font-13 text-black-50">
                                                {identificacion ? identificacion : ''}
                                            </p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item me-3">
                                        <h6 className="mb-1">
                                            Nombres y Apellidos:{' '}
                                            <p className="mb-0 font-13 text-black-50">
                                                {firstname ? firstname : ''}
                                            </p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Correo:{' '}
                                            <p className="mb-0 font-13 text-black-50">
                                                {correo ? correo : ''}
                                            </p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Ficha No:{' '}
                                            <p className="mb-0 font-13 text-black-50">
                                                {direccion ? direccion : ''}
                                            </p>
                                        </h6>
                                    </li>
                                </ul>
                                <ul className="mb-0 list-inline text-black">
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Telefono:{' '}
                                            <p className="mb-0 font-13 text-black-50">{telefono}</p>
                                        </h6>
                                    </li>

                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Jornada:{' '}
                                            <p className="mb-0 font-13 text-black-50">{jornada ? jornada : 'MAÑANA'}</p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Etapa: <p className="mb-0 font-13 text-black-50">{etapa ? etapa:'LECTIVA'}</p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Ficha No.:{' '}
                                            <p className="mb-0 font-13 text-black-50">{ficha ? ficha : '002122222'}</p>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 className="mb-1">
                                            Municipo:{' '}
                                            <p className="mb-0 font-13 text-black-50">{municipio ? municipio: 'BUCARAMANGA'}</p>
                                        </h6>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul className="mb-0 list-inline text-black">
                                    <li className="list-inline-item me-3">
                                        <h5 className="mb-1">PROGRAMA DE FORMACIÓN</h5>
                                        <p className="mb-0 font-13 text-black-50">{programaFormacion ? programaFormacion: 'LECTIVA'} </p>
                                        <p className="mb-0 font-13 text-black-50">{proyectoFormativo ? proyectoFormativo: 'DESARROLLO DE SOFTWARE SENA'} </p>
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
            <Row>

            </Row>
        </>
    );
};

export default DatosAprendiz;
