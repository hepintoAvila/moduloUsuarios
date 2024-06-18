/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { Row, Col, Card, Collapse } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
// components
import { VerticalForm } from '../../../../../components';
import FileUploader from '../../../../../components/FileUploader';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import { SearchContext } from '../../../../../layouts/context/SearchContext';

const FormDocumentosActualizar = (props) => {


  const [options, setOptions] = useState(0);
  const { getData } = useContext(NotificacionesContext);
  const [documentos, setAttachments] = useState({
    attachments: [
      { id: 1, name: 'Cargando...', size: '', ext: '.pdf' },
    ],
  });
const datosAprendiz = props?.itemsConsultarSolicitudByCodigo?.data?.Solicitudes || [];
  const { validateError,  queryFile, loading,  } =  useContext(SearchContext);
  const [open, setOpen] = useState(false);
  const [idSolicitud, setidSolicitud] = useState(props?.idSolicitud);

  const toggle = (id, idSolicitud) => {
    setOptions(id);
    setOpen((prevState) => !prevState);
    setidSolicitud(idSolicitud);

    // Construye la nueva URL con parámetros de consulta y hash
    const newUrl = `${window.location.origin}${window.location.pathname}#dashboard/ModuloSolicitudComite/EnviarSolicitud&p=${idSolicitud}`;
    window.history.pushState({ path: newUrl }, '', newUrl); // Cambia la URL sin recargar la página

    return newUrl;
};

  const deleteDocumento = (id) => {
    Swal.fire({
      title: id === '1' ? 'Desea eliminar los hechos' : 'Desea eliminar el formato de solicitud',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const datosEvent = {
          idOpcion: id,
          codigoFicha: props?.codigoFicha,
          accion: 'ModuloSolicitudComite',
          opcion: 'deleteSolicitud',
          obj: 'deleteFile',
        };
        const queryDatos = Object.entries(datosEvent)
          .map(([key, value]) => {
            const encodedValue = btoa(value);
            return `${key}=${encodedValue}`;
          })
          .join('&');

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Enviando Solicitud...',
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(() => {
          setidSolicitud(id)
          getData(queryDatos);
        }, 2000);
      }
    });
  };

  const [items, setItems] = useState([
    {
      accion: 'ModuloSolicitudComite',
      opcion: 'update_solicitudDocumentos',
      tipo: 'EnviarSolicitud',
      selectedFile: '',
      base64String: '',
      descripcion: '',
    },
  ]);

  const schemaResolver = yupResolver(yup.object().shape({}));


  const onDateChangeFile = (file, base64Strng) => {

     if (file?.path) {
      Swal.fire({
        title: 'Desea subir este documento?',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const selectedFile = {
            selectedFile: {
              base64: base64Strng
            },
          };
          const datosUrl = {
            codigoFicha: props?.codigoFicha,
            idSolicitud: props?.idSolicitud,
            accion: 'Documentos',
            opcion: 'add_documentos',
            tipo: 'add_documentos',
            name: file?.path,
            type: file?.path,
            size: file?.formattedSize,
            entidad: 'senaV1',
          };
           const url = Object.entries(datosUrl)
          .map(([key, value]) => {
              const encodedValue = btoa(value);
              return `${key}=${encodedValue}`;
          })
          .join('&');
          setidSolicitud(datosUrl?.idSolicitud)
          queryFile(url,selectedFile);

        }
      });
    }

 };

  useEffect(() => {
    if (datosAprendiz.length === 1) {
      const objet = {
        accion: 'ModuloSolicitudComite',
        opcion: 'add_solicitud',
        tipo: 'EnviarSolicitud',
        selectedFile: '',
        base64String: '',
        descripcion: datosAprendiz[0]?.hechos,
      };
      setAttachments({ attachments: datosAprendiz[0]?.attachments });
      setItems([objet]);
    }
  }, [datosAprendiz]);


  useEffect(() => {
    return (window.location.hash = `#/dashboard/ModuloSolicitudComite/EnviarSolicitud?p=${idSolicitud}`);
  }, []);

  console.log('idSolicitud',idSolicitud)
  return (
    <>
      {loading ? (
        <Redirect to={`/ModuloSolicitudComite/EnviarSolicitud?p=${idSolicitud}`}></Redirect>
      ) : null}
      <VerticalForm
        resolver={schemaResolver}
        defaultValues={{}}
        className={classNames('col-4')}>
        <Row>
          <Card className={classNames('widget-flat')}>
            <Card.Body>
              <h5 className="mb-3">Documentos Cargados</h5>
              <Row>
                {documentos?.attachments?.map((f, idx) => (
                  <Col xl={4} key={idx}>
                    <Card className="mb-1 shadow-none border">
                      <div className="p-2">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            {f.size === '1' ? (
                              <div className="avatar-sm">
                                <span className="avatar-title bg-primary-lighten text-primary rounded">
                                  <Link
                                    to="#"
                                    className="custom-accordion-title d-block pt-2 pb-2"
                                    onClick={() => { deleteDocumento(f.id) }}
                                  >
                                    <i className="mdi mdi-delete-sweep"></i>
                                  </Link>
                                </span>
                              </div>
                            ) : (
                              <div className="avatar-sm">
                                <span className="avatar-title bg-primary-lighten text-primary rounded">
                                  <Link
                                    to="#"
                                    className="custom-accordion-title d-block pt-2 pb-2"
                                    onClick={() => { toggle(f.id,idSolicitud) }}
                                    aria-controls={'collapse 1'}
                                    aria-expanded={open}>
                                    <i className="mdi mdi-file-upload-outline"></i>
                                  </Link>
                                </span>
                              </div>
                            )}
                          </Col>
                          <Col className="col ps-0">
                            <p className="mb-0 text-muted font-weight-bold">{f.name}</p>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
              <hr />
              <Collapse in={open}>
                <Row>
                  <Col>
                    <Card>
                      <Card.Body>
                        <FileUploader
                          onFileUpload={(e) => {
                            const files = Array.from(e);
                            const file = files[0];
                            const reader = new FileReader();
                            reader.readAsArrayBuffer(file);
                            reader.onload = function () {
                              const base64String = btoa(
                                new Uint8Array(reader.result).reduce(
                                  (data, byte) => data + String.fromCharCode(byte),
                                  ''
                                )
                              );
                              onDateChangeFile(
                                file,
                                base64String,
                              );
                            };
                          }}
                        />
                        {!validateError.filesError && !validateError.base64StringsError ? (
                          <div className="isinvalid">
                            <p className="text-white font-13 m-b-30">
                              CARGUE LA EVIDENCIA EN PDF
                            </p>
                          </div>
                        ) : (
                          <h4 className="header-title mb-3">documento subido</h4>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Collapse>
            </Card.Body>
          </Card>
        </Row>
      </VerticalForm>
    </>
  );
};
export default FormDocumentosActualizar;
