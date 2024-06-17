/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext,useEffect,useState } from 'react';
import FileUploader from '../../../../../components/FileUploader';
import classNames from 'classnames';
import { Button, Row, Col, Card,Link,Collapse } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import { SearchContext } from '../../../../../layouts/context/SearchContext';

const FormDocumentos = (props): React$Element<React$FragmentType> => {

  const [enviar, setEnviar] = useState(false);
  const [options, setOptions] = useState(0);
  const {getData} = useContext(NotificacionesContext);
  const {validateError,setError,queryFile,loading,nombrePrograma,descripcion,fallas} = useContext(SearchContext)
  const [documentos, setAttachments] = useState({
    attachments: [
        { id: 1, name: 'Cargando...', size: '', ext: '.pdf' },
    ],
});
const datosAprendiz = props?.itemsConsultarSolicitudByCodigo?.data?.Solicitudes || [];
const [open, setOpen] = useState(false);
const [items, setItems] = useState([
  {
      idAprendiz: '',
      accion: 'ModuloSolicitudComite',
      opcion: 'add_solicitud',
      tipo: 'EnviarSolicitud',
      selectedFile: '',
      base64String: '',
  },
]);




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
              getData(queryDatos);
          }, 2000);
      }
  });
};

const toggle = (id) => {
    setOptions(id);
    setOpen((prevState) => !prevState);
};
  const onDateChangeFileEnviar = (file, base64String, filesError, base64StringsError, options) => {
    if (file) {
        setError({ ...validateError, filesError: filesError, base64StringsError: base64StringsError });
        Swal.fire({
            title: 'Desea subir este documento?',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const datosfiles = {
                    codigoFicha: props?.codigoFicha,
                    idSolicitud: props?.idSolicitud,
                    options: options,
                    accion: 'ModuloSolicitudComite',
                    opcion: 'add_documentos',
                    tipo: 'add_documentos',
                    selectedFile: file,
                };
                const queryDatos = Object.entries(datosfiles)
                    .map(([key, value]) => {
                        const encodedValue = btoa(value);
                        return `${key}=${encodedValue}`;
                    })
                    .join('&');
                    console.log(queryDatos);
                //queryFile(queryDatos, base64String);
            }
        });
    }
};
const onDateChangeFile = (file,base64String,filesError,base64StringsError) => {
  if (file) {
      setError({...validateError,filesError:filesError,base64StringsError:base64StringsError})
      setItems([{
          ...items[0],
          selectedFile:file,
          base64String:base64String,
          idAprendiz:props?.idAprendiz,
        }])
  }
};

useEffect(() => {
  if (datosAprendiz.length === 1) {
      setAttachments({ attachments: datosAprendiz[0]?.attachments });
  }
}, [datosAprendiz]);
return (
  <>
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
                  // Cuando la lectura del archivo termine
                  reader.onload = function () {
                    // Convertir el contenido del archivo a una cadena base64
                    const base64String = btoa(
                      new Uint8Array(reader.result)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );


                    onDateChangeFile(JSON.stringify(file),base64String,true,true)
                }

                //
                }}
            />
            {!validateError.filesError && !validateError.base64StringsError ? <div className="isinvalid"><p className="text-white font-13 m-b-30">CARGUE LA EVIDENCIA EN PDF</p></div>:<h4 className="header-title mb-3">documento subido</h4>}

        </Card.Body>
    </Card>
</Col>
</Row>
<h5 className="mb-3">Documentos Cargados</h5>

<Row>
    {documentos?.attachments?.map((f, idx) => (
        <Col xl={12} key={idx}>
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
                                            onClick={() => { toggle(f.id) }}
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
                                    JSON.stringify(file),
                                    base64String,
                                    true,
                                    true,
                                    options
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
</>
  );
};

export default FormDocumentos;
