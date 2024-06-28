/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
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
import { SearchContext } from '../../../../../layouts/context/SearchContext';

const FormDocumentosActualizar = (props) => {
const datosAprendiz = props?.itemsConsultarSolicitudByCodigo?.data?.Solicitudes || [];
  const { validateError,  queryFile, loading,idSolicitud, setidSolicitud  } =  useContext(SearchContext);
  const [open, setOpen] = useState(false);


  const toggle = (idSolicitud) => {
    setOpen((prevState) => !prevState);
    setidSolicitud(idSolicitud);
  };



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
            idAprendiz: datosAprendiz?.idAprendiz,
            accion: 'Documentos',
            opcion: 'add_documentos',
            tipo: 'add_documentos',
            name: file?.path,
            type: file?.path,
            size: file?.formattedSize,
            entidad: 'senaV1',
            maxId: '1',
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
                  <Col xl={4}>
                    <Card className="mb-1 shadow-none border">
                      <div className="p-2">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                          <div className="avatar-sm">
                                <span className="avatar-title bg-primary-lighten text-primary rounded">
                                  <Link
                                    to={`?p=${idSolicitud}`}
                                    className="custom-accordion-title d-block pt-2 pb-2"
                                    onClick={() => { toggle(idSolicitud) }}
                                    aria-controls={'collapse 1'}
                                    aria-expanded={open}>
                                    <i className="mdi mdi-file-upload-outline"></i>
                                  </Link>
                                </span>
                              </div>
                          </Col>
                          <Col className="col ps-0">
                            <p className="mb-0 text-muted font-weight-bold"></p>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </Col>
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
                          idSolicitud={idSolicitud}
                        />
                        {!validateError.filesError && !validateError.base64StringsError ? (
                          <div className="isinvalid">
                            <p className="text-white font-13 m-b-30">
                              CARGUE LA EVIDENCIA EN PDF
                            </p>
                          </div>
                        ) : (
                          <h4 className="header-title mb-3">Actualizar documento de la Evidencia</h4>
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
