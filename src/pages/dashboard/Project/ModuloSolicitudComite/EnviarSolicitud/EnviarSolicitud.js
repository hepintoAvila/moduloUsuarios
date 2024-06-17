/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Tab, Nav, Card, Collapse, Button } from 'react-bootstrap';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
import classnames from 'classnames';

import FormDatosAprendiz from './FormDatosAprendiz';
import FormDatosIncidente from './FormDatosIncidente';
import FormDatosEvidencia from './FormDatosEvidencia';
import HeaderForm from '../Components/HeaderForm';
import TopbarSearch from '../../../../../components/TopbarSearch';
import CarHistorialIncidencias from '../ConsultarIncidente/CarHistorialIncidencias';

import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import CarSolicitudeEnviadas from '../ConsultarIncidente/CarSolicitudeEnviadas';
import LogoSena from '../Components/LogoSena';
import FormDocumentos from './FormDocumentos';
import { VerticalForm } from '../../../../../components';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import classNames from 'classnames';
import { DatosSolicitudContext } from '../../../../../layouts/context/DatosComiteContext';
function contarVerdaderos(array) {
  let contador = 0;
  for (let i = 0; i <= array.length; i++) {
      if (array[i] === true) {
          contador++;
      }
  }
  return contador;
}
const EnviarSolicitud = (props) => {
  const { itemsOptionAprendiz, descripcion, descripcionError,validateError, setError, queryFile, loading, nombrePrograma,fallas } = useContext(SearchContext);
  const { itemsAprendices, query, itemsSolicitudByID, activeTab, setActiveTab, openFormAprendiz } = useContext(NotificacionesContext);
  const [enviar, setEnviar] = useState(false);
  const { convertirFecha } = useContext(NotificacionesContext);

  const { itemsSolicitud} = useContext(DatosSolicitudContext);
      const allApredizDatos = itemsAprendices?.data?.Aprendices || [];

  const { sizePerPageList } = useContext(DashboardContext);
  const datosSolicitudes = itemsSolicitudByID?.data?.Solicitudes || [];

  useEffect(() => {
    query('ModuloSolicitudComite', 'Aprendiz', [{ opcion: encodeBasicUrl('listaAprendices'), obj: 'aprendices' }]);
  }, []);
  const options = {
    autosave: {
        enabled: false,
        uniqueId: 1,
    },
    toolbar: [
        'bold', 'italic', 'heading', '|',
        'quote', 'unordered-list', 'ordered-list', '|',
        'link', 'image', '|',
    ],
};
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
      text: 'Consulta el estado de tus solicitudes enviadas',
    },
  ];

  const queryEnviados = (index) => {
    if (index === 2) {
      query('ModuloSolicitudComite', 'ConsultarSolicitud', [{ opcion: encodeBasicUrl('ConsultarSolicitud'), obj: 'ConsultarSolicitudByID', sw: 2 }]);
      setActiveTab('Solicitudes Enviadas');
    } else if (index === 0) {
      setActiveTab('Enviar Solicitud');
    } else {
      setActiveTab('Historial del Aprendiz');
    }
  };
  const schemaResolver = yupResolver(yup.object().shape({}));
  const onSubmit = () => {
      setEnviar(!enviar);
  };



  useEffect(() => {
    if (enviar) {
        const obj = Object.values({ ...validateError });
        let numtrue = contarVerdaderos(obj);

        if (Number(numtrue) === 8) {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Solicitud Enviada',
                showConfirmButton: false,
                timer: 1500,
            });
            const datosfiles = {
              idAprendiz:itemsSolicitud[0].idAprendiz,
              tipoComite: itemsSolicitud[0].tipoComite,
              tipoAtencion: itemsSolicitud[0].tipoComite,
              fechaIncidente: convertirFecha(itemsSolicitud[0].fechaIncidente),
              accion: 'ModuloSolicitudComite',
              opcion: 'add_solicitud',
              tipo: 'EnviarSolicitud',
              selectedFile: itemsSolicitud[0].selectedFile,
              descripcion:itemsSolicitud[0].descripcion,
              nombrePrograma:itemsSolicitud[0].nombrePrograma,
                ...fallas[0],
            };

            const queryDatos = datosfiles
                ? Object.keys(datosfiles)
                      .map((key) => key + '=' + btoa(datosfiles[key]))
                      .join('&')
                : '';
                //console.log('FormDatosEnviar',{...itemsSolicitud[0]})
                queryFile(queryDatos, itemsSolicitud[0].base64String);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'ERROR:: FALTAN CAMPOS POR DILIGENCIAR',
            });
        }
    }
}, [enviar]);

  return (
    <React.Fragment>
      <Row className="header-title mb-3">
        <Col lg={12}>
          <Card>
            <Card.Body>
              <h4 className="header-title mb-3">ADMINISTRADOR DE SOLICITUDES</h4>
              <Tab.Container defaultActiveKey={activeTab}>
                <Nav variant="tabs">
                  {tabContents.map((tab, index) => {
                    return (
                      <Nav.Item key={index}>
                        <Nav.Link href="#" eventKey={tab.title} onSelect={() => queryEnviados(index)}>
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
                                        {!props?.aprendizError ? (
                                          <div className="hederComponente">SELECCIONE EL APRENDIZ</div>
                                        ) : (
                                          <div className="hederComponente">APRENDIZ SELECCIONADO</div>
                                        )}
                                        <TopbarSearch data={allApredizDatos}
                                          selectedOption={`${itemsOptionAprendiz?.Nombres?.toUpperCase()} ${itemsOptionAprendiz?.Apellidos?.toUpperCase()}`} />
                                      </Col>
                                      <Col lg={6}></Col>
                                    </Row>
                                    <Collapse in={openFormAprendiz}>
                                      <div className={classNames('col-12')}>
                                        <VerticalForm
                                          onSubmit={onSubmit}
                                          resolver={schemaResolver}
                                          defaultValues={{}}

                                          className={classNames('col-12')}>
                                          <Row className=" mb-5">
                                            <div
                                              className="mb-3 mb-4 text-center btnenviarSolicitud">
                                              <Button variant="primary" type="submit" disabled={loading}>
                                                {'ENVIAR SOLICITUD'}
                                              </Button>
                                            </div>
                                          </Row>
                                          <Row>
                                            <Col lg={6}>
                                              <FormDatosIncidente
                                                idAprendiz={itemsOptionAprendiz?.idAprendiz}
                                                itemsDescripcion={descripcion}
                                                aprendizError={itemsOptionAprendiz?.aprendizError}
                                                descripcionError={descripcionError}
                                              />
                                              <FormDocumentos idAprendiz={itemsOptionAprendiz?.idAprendiz} />
                                            </Col>
                                            <Col lg={6} className="derechaColumnEnviarSolicitud">
                                              <p className="mt-3">{tab.text}</p>
                                              <FormDatosAprendiz handleClick={props.handleClick} datosAprendiz={itemsOptionAprendiz} />
                                              <FormDatosEvidencia id={'1'} options={options}/>
                                            </Col>
                                          </Row>
                                        </VerticalForm>
                                      </div>
                                    </Collapse>
                                  </>
                                );
                              case 1:
                                return (
                                  <Row>
                                    <Col lg={12}>
                                      <p className="mt-3">{tab.text}</p>
                                      <CarHistorialIncidencias />
                                    </Col>
                                  </Row>
                                );
                              case 2:
                                return (
                                  <Row>
                                    <Col sm="12">
                                      {datosSolicitudes?.length > 0 ?
                                        <CarSolicitudeEnviadas
                                          Solicitudes={datosSolicitudes}
                                          sizePerPageList={sizePerPageList}
                                          idAprendiz={itemsOptionAprendiz?.idAprendiz}
                                          itemsDescripcion={descripcion}
                                          aprendizError={itemsOptionAprendiz?.aprendizError}
                                          descripcionError={descripcionError}
                                          handleClick={props.handleClick} datosAprendiz={itemsOptionAprendiz}
                                          children={<TopbarSearch data={allApredizDatos}
                                            selectedOption={`${itemsOptionAprendiz?.Nombres?.toUpperCase()} ${itemsOptionAprendiz?.Apellidos?.toUpperCase()}`} />}
                                        /> : null}
                                    </Col>
                                  </Row>
                                );
                              default:
                                return (<><LogoSena /></>);
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
