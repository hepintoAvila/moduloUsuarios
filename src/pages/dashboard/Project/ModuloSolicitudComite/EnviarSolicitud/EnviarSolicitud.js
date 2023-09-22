import React, { useContext, useEffect } from 'react';
import {Row, Col, Tab, Nav, Card } from 'react-bootstrap';
import FormDatosAprendiz from './FormDatosAprendiz';
import FormDatosIncidente from './FormDatosIncidente';
import FormDatosEvidencia from './FormDatosEvidencia';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
import TopbarSearch from '../../../../../components/TopbarSearch';
import classnames from 'classnames'; 
import CarHistorialIncidencias from '../ConsultarIncidente/CarHistorialIncidencias';
import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import CarSolicitudeEnviadas from '../ConsultarIncidente/CarSolicitudeEnviadas';
import HeaderForm from '../Components/HeaderForm';

const EnviarSolicitud = (props) => {
    const {itemsOptionAprendiz,descripcion,descripcionError} = useContext(SearchContext)
    const {itemsAprendices,query,itemsSolicitudByID} = useContext(NotificacionesContext)
    const allApredizDatos = itemsAprendices?.data?.Aprendices || [];
 
    const {
      sizePerPageList
    } = useContext(DashboardContext);
    const datosSolicitudes = itemsSolicitudByID?.data?.Solicitudes|| [];

    useEffect(() => {
        query('ModuloSolicitudComite','Aprendiz',[{opcion:encodeBasicUrl('listaAprendices'),obj:'aprendices'}]);
      }, [query]);

      const tabContents = [
        {
            id: '1',
            title: 'Enviar Solicitud',
            icon: 'mdi mdi-home-variant',
            text: '',
        },
        {
            id: '2',
            title: 'Historial del Aprendiz',
            icon: 'mdi mdi-account-circle',
            text: 'Consulta el historial del Aprendiz una vez haya sido seleccionado de la opción: enviar solicitus.',
            
        },
        {
            id: '3',
            title: 'Solicitudes Enviadas',
            icon: 'mdi mdi-cog-outline',
            text: 'Connsulta el estado de tus solicitudes enviadas',
        },
    ];
    const queryEnviados = (index) => {
        if(index===2){
           query('ModuloSolicitudComite','ConsultarSolicitud',[{opcion:encodeBasicUrl('ConsultarSolicitud'),obj:'ConsultarSolicitudByID',sw:2}]);
        }
        
        //
      };

  
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
                                                <Nav.Link href="#" eventKey={tab.title} onSelect={()=>queryEnviados(index)}>
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
                                                                        <Col lg={12}>   
                                                                        <HeaderForm title={'SOLICITUD DE COMITÉ DE EVALUACIÓN Y SEGUIMIENTO'} />
                                                                        </Col>
                                                                        </Row>
                                                                        
                                                                        <Row>

                                                                            <Col lg={6}>
                                                                               <FormDatosIncidente
                                                                                    idAprendiz={itemsOptionAprendiz?.idAprendiz}
                                                                                    itemsDescripcion={descripcion}
                                                                                    aprendizError={itemsOptionAprendiz?.aprendizError}
                                                                                    descripcionError={descripcionError}
                                                                                    children={<TopbarSearch data={allApredizDatos}
                                                                                        selectedOption={`${itemsOptionAprendiz?.Nombres?.toUpperCase()} ${itemsOptionAprendiz?.Apellidos?.toUpperCase()}`} />}
                                                                                /> 
                                                                            </Col>
                                                                            <Col lg={6} className="derechaColumnEnviarSolicitud">
                                                                            
                                                                                <p className="mt-3">{tab.text}</p>
                                                                               
                                                                                <FormDatosAprendiz handleClick={props.handleClick} datosAprendiz={itemsOptionAprendiz} />
                                                                               <br/>
                                                                                <FormDatosEvidencia />
                                                                                
                                                                               </Col>
                                                                                           
                                                                        </Row>
                                                                 </>);
                                                                case 1:
                                                                return (
                                                                    <Row>
                                                                     <Col lg={12}>
                                                                        <p className="mt-3">{tab.text}</p>
                                                                        <CarHistorialIncidencias/>
                                                                    </Col>
                                                                </Row>
                                                                );
                                                                case 2:
                                                                    return (
                                                                        <Row>
                                                                        <Col sm="12">
                                                                        {datosSolicitudes?.length>0 ? <CarSolicitudeEnviadas Solicitudes={datosSolicitudes} sizePerPageList={sizePerPageList}/>:null}
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