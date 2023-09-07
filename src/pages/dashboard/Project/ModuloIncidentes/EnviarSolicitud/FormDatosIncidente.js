// @flow
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { Button, Alert, Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// components
import { VerticalForm, FormInput } from '../../../../../components';
import HyperDatepicker from '../../../../../components/Datepicker';
import HeaderForm from '../Components/HeaderForm';
import FileUploader from '../../../../../components/FileUploader';
import { queryFormSend } from '../../../../../redux/actions';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
/*
const guardar = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (validated) {
      if (temas.selectedFile) {
        const datosfiles = {
          filename: temas.selectedFile[0].name,
          size: temas.selectedFile[0].size,
          formattedSize: temas.selectedFile[0].formattedSize,
          lastModified: temas.selectedFile[0].lastModified,
          type: temas.selectedFile[0].type,
        };
        const queryDatos = datosfiles
          ? Object.keys(datosfiles)
            .map((key) => key + '=' + datosfiles[key])
            .join('&')
          : '';
        const file = temas.selectedFile[0];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        // Cuando la lectura del archivo termine
        reader.onload = function () {
          // Convertir el contenido del archivo a una cadena base64
          const base64String = btoa(
            new Uint8Array(reader.result)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          //queryFile(queryDatos, base64String)
        };

      }
    }
  }
  */
const FormDatosIncidente = (props): React$Element<React$FragmentType> => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [validateError, setError] = useState({
                                                comiteError:false,
                                                llamadoError:false,
                                                aprendizError:false,
                                                fechaError:false,
                                            });
    
    const [items, setItems] = useState([{
        idAprendiz: props?.idAprendiz?.length===0 ? '':props?.idAprendiz,
        tipoComite: '',
        tipoLLamado: '',
        fechaIncidente: '',
        accion: 'ModuloIncidentes',
        opcion: 'add',
        tipo: 'EnviarSolicitud',
        selectedFile:[],
        descripcion:props?.itemsDescripcion?.length===0 ? '':props?.itemsDescripcion,
    }]);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { loading, queryForm, error } = useSelector((state) => ({
        loading: state.Queryform.loading,
        error: state.Queryform.error,
        queryForm: state.Queryform.queryForm,
    }));

    const schemaResolver = yupResolver(
        yup.object().shape({
            idAprendiz: yup.string().required(t('Seleccione el Aprendiz de la lista')),
            tipoComite: yup.string().required('Seleccione el tipo de Comité'),
            tipoLLamado: yup.string().required('Seleccione el tipo de LLamado'),
            fechaIncidente: yup.string().required('Seleccione la fecha del Incidente'),
        })
      );

    const onSubmit = () => {
        dispatch(queryFormSend(...items))
    };

    useEffect(() => {
         const  comiteError = items[0]?.tipoComite?.length===0 ? true:false
         const  llamadoError = items[0]?.tipoLLamado?.length===0 ? true:false
         const  aprendizError = items[0]?.idAprendiz?.length===0 ? true:false
         const  fechaError = items[0]?.fechaIncidente?.length===0 ? true:false    
          setError({comiteError,llamadoError,aprendizError,fechaError})
      }, [items]);

      const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
            setItems([{
                ...items[0], fechaIncidente:date,
              }])
        }
    };
    //items[0]?.tipoComite.length===0 ? true:false
 
    console.log('error',items);
    return (
        <>
            {queryForm ? <Redirect to={`/dashboard/ModuloIncidentes/EnviarSolicitud`}></Redirect> : null}
            {error && (
                <Alert variant="danger" className="my-2">
                    {error}
                </Alert>
            )}
            <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={items}>
                <Row>
                    <Card className={classNames('widget-flat')}>

                        <HeaderForm title={'DATOS DEL INCIDENTE'} />
                        <Card.Body>

                            <Row className="align-items-center">
                                <Col className="col-12">
                                   {!props?.aprendizError? <div className="isinvalid">'SELECCIONE EL APRENDIZ</div>:<div>ID del Aprendiz</div>}
                                    <FormInput
                                        type="text"
                                        name="idAprendiz"
                                        placeholder={props?.idAprendiz}
                                        containerClass={'mb-3'}
                                        value={props?.idAprendiz}
                                        disabled
                                        isInvalid={validateError.aprendizError}
                                        errors={''}
                                        required
                                    />
                                    <FormInput
                                        name="tipoComite"
                                        label="Seleccione el tipo de comité"
                                        type="select"
                                        containerClass="mb-3"
                                        className="form-select"
                                        key="tipoComite"
                                        isInvalid={validateError.comiteError}
                                        errors={''}
                                        onChange={(e) => setItems([{
                                            ...items[0], tipoComite: e.target.value,
                                          }])}
                                    >
                                        <option value="ACADEMICO"> ACADEMICO</option>
                                        <option value="DISCIPLINARIO">DISCIPLINARIO</option>
                                        <option value="AMBIENTAL">AMBIENTAL</option>
                                    </FormInput>
                                     
                                    <FormInput
                                        name="tipoLLamado"
                                        label="Seleccione el tipo de LLamado"
                                        type="select"
                                        containerClass="mb-3 font-weight-bold"
                                        className="form-select"
                                        key="tipoLLamado"
                                        isInvalid={validateError.llamadoError}
                                        onChange={(e) => setItems([{
                                            ...items[0], tipoLLamado: e.target.value,
                                          }])}
                                    >
                                        <option>Seleccione...</option>
                                        <option value="GRAVE">GRAVE</option>
                                        <option >MEDIO</option>
                                        <option value="MEDIO-Verbal"> -Verbal</option>
                                        <option value="MEDIO-Escrito"> -Escrito</option>
                                        <option >BAJA</option>
                                        <option value="BAJA-Verbal"> -Verbal</option>
                                        <option value="BAJA-Escrito"> -Escrito</option>
                                    </FormInput>
                                    <div className="mb-3">
                                        <label>Fecha y Hora</label> <br />
                                        <HyperDatepicker
                                            name="fechaIncidente"
                                            hideAddon={true}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            tI={60}
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            timeCaption="time"
                                            className="form-control"
                                            value={selectedDate}
                                            onChange={(date) =>
                                                onDateChange(date)
                                                }
                                        />
                                        <div className="isinvalid">
                                            {validateError.fechaError ? 
                                                 'SELECCIONE LA FECHA Y HORA'
                                             : ''}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            
                                            {items?.selectedFile?.length===1? <h4 className="header-title mb-3">documento subido</h4>:<div className="isinvalid"><p className="text-white font-13 m-b-30">CARGUE LA EVIDENCIA EN PDF</p></div>}
                                            

                                            <FileUploader
                                                setFiles={props.setFiles}
                                                onFileUpload={(e) => {
                                                const files = Array.from(e);
                                                //const file = JSON.stringify(files);
                                                setItems({ ...items[0], selectedFile: files });
                                                }}
                                            />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Form.Group className="mb-3 mb-3 mb-3 ">
                        <Button variant="primary" type="submit" disabled={loading}>
                                ENVIAR SOLICITUD
                            </Button>
                        </Form.Group>
                    </Col>
                </Row>
            </VerticalForm>
        </>
    );
};

export default FormDatosIncidente;
