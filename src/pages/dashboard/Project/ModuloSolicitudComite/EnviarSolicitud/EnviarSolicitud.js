import React, { useContext, useEffect } from 'react';
import {Row, Col, Tab, Nav, Card } from 'react-bootstrap';
import FormDatosAprendiz from './FormDatosAprendiz';
import FormDatosIncidente from './FormDatosIncidente';
import FormDatosEvidencia from './FormDatosEvidencia';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
import TopbarSearch from '../../../../../components/TopbarSearch';
import { useAdminUsuarios } from '../../../../../hooks/useAdminUsuarios';
import classnames from 'classnames'; 
import CarHistorialIncidencias from '../ConsultarIncidente/CarHistorialIncidencias';
import CarSolicitudeEnviadas from '../ConsultarIncidente/CarSolicitudeEnviadas';
import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';
import ConsultaCalendario from './ConsultaCalendario';

const EnviarSolicitud = (props) => {
    const {itemsOptionAprendiz,descripcion,descripcionError} = useContext(SearchContext)
    const {itemsAprendices,query} = useAdminUsuarios()
    const allApredizDatos = itemsAprendices?.data?.aprencices || [];


    useEffect(() => {
        query('ModuloSolicitudComite','Aprendiz',[{opcion:encodeBasicUrl('listaAprendices'),obj:'aprendices'}]);
      }, [query]);

      const tabContents = [
        {
            id: '1',
            title: 'Enviar Solicitud',
            icon: 'mdi mdi-home-variant',
            text: 'Envia tus solicitudes al comité a travez de este formulario.',
        },
        {
            id: '2',
            title: 'Solicitudes Enviadas',
            icon: 'mdi mdi-account-circle',
            text: 'Connsulta el estado de tus solicitudes enviadas',
        },
        {
            id: '3',
            title: 'Historial del Aprendiz',
            icon: 'mdi mdi-cog-outline',
            text: 'Consulta el historial del Aprendiz una vez haya sido seleccionado de la opción: enviar solicitus.',
        },
    ];
    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-3">ADMINISTRADOR DE SOLICITUDES</h4>
                            <Tab.Container defaultActiveKey="Enviar Solicitud">
                                <Nav variant="tabs">
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <Nav.Item key={index}>
                                                <Nav.Link href="#" eventKey={tab.title}>
                                                    <i
                                                        className={classnames(
                                                            tab.icon,
                                                            'd-md-none',
                                                            'd-block',
                                                            'me-1'
                                                        )}></i>
                                                    <span className="d-none d-md-block">{tab.title}</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                        );
                                    })}
                                </Nav>
                                <Tab.Content>
                                    {tabContents?.map((tab, index) => {
                                        return (
                                            <Tab.Pane eventKey={tab.title} id={tab.id} key={index}>
                                                <Row>
                                                {(() => {
                                                        switch (Number(index)) {
                                                            case 0:
                                                                return (
                                                                <>
                                                                        <Row>

                                                                            <Col lg={4}>
                                                                            <p className="mt-3">{''}<br /></p>
                                                                                <FormDatosIncidente
                                                                                    idAprendiz={itemsOptionAprendiz?.idAprendiz}
                                                                                    itemsDescripcion={descripcion}
                                                                                    aprendizError={itemsOptionAprendiz?.aprendizError}
                                                                                    descripcionError={descripcionError}
                                                                                    children={<TopbarSearch data={allApredizDatos}
                                                                                        selectedOption={`${itemsOptionAprendiz?.Nombres?.toUpperCase()} ${itemsOptionAprendiz?.Apellidos?.toUpperCase()}`} />}
                                                                                /> 
                                                                            </Col>
                                                                            <Col lg={4}>
                                                                                <p className="mt-3">{''}<br /></p>
                                                                                <FormDatosEvidencia />
                                                                            </Col>
                                                                            <Col lg={4}>
                                                                                <p className="mt-3">{tab.text}</p>
                                                                                <FormDatosAprendiz handleClick={props.handleClick} datosAprendiz={itemsOptionAprendiz} />
                                                                                <ConsultaCalendario />
                                                                            </Col>
                                                                             
                                                                        </Row>
                                                                 </>);
                                                                case 1:
                                                                return (
                                                                    <Row>
                                                                     <Col lg={12}>
                                                                        <p className="mt-3">1{tab.text}</p>
                                                                        <CarSolicitudeEnviadas />
                                                                    </Col>
                                                                </Row>
                                                                );
                                                                case 2:
                                                                    return (
                                                                        <Row>
                                                                        <Col sm="12">
                                                                        <CarHistorialIncidencias/> 
                                                                        </Col>
                                                                    </Row>
                                                                    ); 
                                                                    default:
                                                                      return(<>{''}</>)                                                              
                                                        }
                                                        })()}
                                                
                                                </Row>
                                            </Tab.Pane>
                                        );
                                    })}
                                </Tab.Content>
                            </Tab.Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </React.Fragment>
    );
};
export default EnviarSolicitud;