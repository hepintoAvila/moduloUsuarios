// @flow
import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { Button, Alert, Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2'
// components
import { VerticalForm, FormInput } from '../../../../../components';
import HyperDatepicker from '../../../../../components/Datepicker';
import HeaderForm from '../Components/HeaderForm';
import FileUploader from '../../../../../components/FileUploader';
import { queryFormSend } from '../../../../../redux/actions';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
function contarVerdaderos(array) {
    let contador = 0;
    for (let i = 0; i <= array.length; i++) {
      if (array[i] === true) {
        contador++;
      }
    }
    return contador;
  }
const FormDatosIncidente = (props): React$Element<React$FragmentType> => {
    const children = props.children || null;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const {validateError,setError} = useContext(SearchContext)

    
    const [items, setItems] = useState([{
        idAprendiz: props?.idAprendiz?.length===0 ? '':props?.idAprendiz,
        tipoComite: '',
        tipoLLamado: '',
        fechaIncidente: '',
        accion: 'ModuloIncidentes',
        opcion: 'add',
        tipo: 'EnviarSolicitud',
        selectedFile:'',
        base64String:'',
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
        })
      );
      const onSubmit = () => {
        const obj = Object.values({...validateError})
        let numtrue = contarVerdaderos(obj)

        if(Number(numtrue)===7){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Solicitud Enviada',
                showConfirmButton: false,
                timer: 1500
              })
            dispatch(queryFormSend(...items))
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'ERROR:: FALTAN CAMPOS POR DILIGENCIAR'
              })
        }

        console.log(numtrue,obj);
       
      };
    useEffect(() => {
         const  comiteError = items[0]?.tipoComite?.length===0 ? false:true
         const  llamadoError = items[0]?.tipoLLamado?.length===0 ? false:true
         const  aprendizError = items[0]?.idAprendiz?.length===0 ? false:true
         const  fechaError = items[0]?.fechaIncidente?.length===0 ? false:true    
          setError({...validateError,comiteError,llamadoError,aprendizError,fechaError})
      }, [items]);

      const onDateChange = (date,fechaError) => {
        if (date) {
            setSelectedDate(date);
            setError({...validateError,fechaError:fechaError})
            setItems([{
                ...items[0], fechaIncidente:date,
              }])
        }
    };
    
    const onDateChangeFile = (file,base64String,files,base64Strings) => {
        if (file) {
            setError({...validateError,files:files,base64Strings:base64Strings})
            setItems([{
                ...items[0], 
                selectedFile:file,
                base64String:base64String
              }])
        }
    };
 
 
    useEffect(() => {
        if (props?.itemsDescripcion?.length>0){
        setError({...validateError,descripcionError:true})
        setItems([{
            ...items[0], descripcion:props?.itemsDescripcion,
          }])
        }else{
            setError({...validateError,descripcionError:false})
        }
    }, [props?.itemsDescripcion]);

    useEffect(() => {
        if (props?.idAprendiz?.length===0){
            setError({...validateError,aprendizError:false})
        }else{
            setError({...validateError,aprendizError:true})
            setItems([{
                ...items[0], idAprendiz:props?.idAprendiz,
              }])
        }
    }, [props?.idAprendiz]);

 
    return (
        <>
      {queryForm ? <Redirect to={`/ModuloIncidentes/EnviarSolicitud?p=${items[0]?.idAprendiz}`}></Redirect> : null}
           <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                <Row>
                    <Card className={classNames('widget-flat')}>

                        <HeaderForm title={'DATOS DEL INCIDENTE'} />
                        <Card.Body>

                            <Row className="align-items-center">
                                <Col className="col-12">
                                   {!props?.aprendizError? <div className="isinvalid">SELECCIONE EL APRENDIZ</div>:<div>APRENDIZ:</div>}
                                    {children}
                                    <br/>
                                    <FormInput
                                        name="tipoComite"
                                        label="Seleccione el tipo de comité"
                                        type="select"
                                        containerClass="mb-3"
                                        className="form-select"
                                        key="tipoComite"
                                        isInvalid={!validateError.comiteError}
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
                                        isInvalid={!validateError.llamadoError}
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
                                                onDateChange(date,true)
                                                }
                                        />
                                        <div className="isinvalid">
                                            {!validateError.fechaError ? 
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
                                            
                                            {!validateError.files && !validateError.base64Strings ? <div className="isinvalid"><p className="text-white font-13 m-b-30">CARGUE LA EVIDENCIA EN PDF</p></div>:<h4 className="header-title mb-3">documento subido</h4>}
                                            

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
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
                <Row>
                    <Col sm={12}>
                    <div className="mb-3 mb-0 text-center">
          <Button variant="primary" type="submit" disabled={loading}>
            {t('ENVIAR SOLICITUD')}
          </Button>
        </div>
                    </Col>
                </Row>
            </VerticalForm>
        </>
    );
};

export default FormDatosIncidente;
