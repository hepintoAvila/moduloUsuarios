// @flow
import React, {useContext,useState } from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { Button,Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2'
// components
import { VerticalForm, FormInput } from '../../../../../components';
import HyperDatepicker from '../../../../../components/Datepicker';
import HeaderForm from '../Components/HeaderForm';
import FileUploader from '../../../../../components/FileUploader';
 
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';


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
    const [selectedDatePropuesta, setSelectedDatePropuesta] = useState(new Date());
    
    const {validateError,setError,queryFile,loading,nombrePrograma} = useContext(SearchContext)
 
    
    const [items, setItems] = useState([{
        idAprendiz: props?.idAprendiz?.length===0 ? '':props?.idAprendiz,
        tipoComite: '',
        tipoAtencion: '',
        fechaIncidente: '',
        fechaPropuesta: '',
        accion: encodeBasicUrl('ModuloSolicitudComite'),
        opcion: encodeBasicUrl('add_solicitud'),
        tipo: encodeBasicUrl('EnviarSolicitud'),
        selectedFile:'',
        base64String:'',
        descripcion:props?.itemsDescripcion?.length===0 ? '':props?.itemsDescripcion,
        nombrePrograma:nombrePrograma?.length===0 ? '':nombrePrograma,

    }]);
 
    const { t } = useTranslation();
    const schemaResolver = yupResolver(
        yup.object().shape({
        })
      );
      const onSubmit = () => {
        const obj = Object.values({...validateError})
        let numtrue = contarVerdaderos(obj)
        console.log('numtrue',numtrue);
        if(Number(numtrue)===9){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Solicitud Enviada',
                showConfirmButton: false,
                timer: 1500
              })
        const datosfiles = 
            {
                idAprendiz:btoa(items[0].idAprendiz),
                tipoComite:btoa(items[0].tipoComite),
                tipoAtencion:btoa(items[0].tipoAtencion),
                fechaIncidente:btoa(items[0].fechaIncidente),
                fechaPropuesta:btoa(items[0].fechaPropuesta),
                accion: btoa('ModuloSolicitudComite'),
                opcion: btoa('add_solicitud'),
                tipo: btoa('EnviarSolicitud'),
                selectedFile:btoa(items[0].selectedFile),
                descripcion:btoa(items[0].descripcion),
                nombrePrograma:btoa(items[0].nombrePrograma),

                
            }
            const queryDatos = datosfiles
            ? Object.keys(datosfiles)
              .map((key) => key + '=' + datosfiles[key])
              .join('&')
            : '';
            queryFile(queryDatos, items[0].base64String)
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'ERROR:: FALTAN CAMPOS POR DILIGENCIAR'
              })
        }

        
       
      };


      const onDateChangefechaIncidente = (date,fechaIncidenteError) => {
        if (date) {
            setSelectedDate(date);
            setError({...validateError,fechaIncidenteError:fechaIncidenteError})
            setItems([{
                ...items[0], fechaIncidente:date,
              }])
        }
    };
    const onDateChangePropuesta = (date,fechaPropuestaError) => {
        if (date) {
            setSelectedDatePropuesta(date);
            setError({...validateError,fechaPropuestaError:fechaPropuestaError})
            setItems([{
                ...items[0], fechaPropuesta:date,
              }])
        }
    };
    
    
    const onDateChangeFile = (file,base64String,filesError,base64StringsError) => {
        if (file) {
            setError({...validateError,filesError:filesError,base64StringsError:base64StringsError})
            setItems([{
                ...items[0], 
                selectedFile:file,
                base64String:base64String
              }])
        }
    };
    const onChangeTipoAtencion= (value,tipoAtencionError) => {
        if (value) {
            setError({...validateError,tipoAtencionError:tipoAtencionError})
            setItems([{
                ...items[0], 
                tipoAtencion: value,
              }])
        }
    };
        const onChangeTipoComite= (value,comiteError) => {
        if (value) {
            setError({...validateError,comiteError:comiteError})
            setItems([{
                ...items[0], 
                tipoComite:value,
              }])
        }
    };
    return (
        <>
      {loading ? <Redirect to={`/ModuloSolicitudComite/EnviarSolicitud?p=${items[0]?.idAprendiz}`}></Redirect> : null}
           <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}} className={classNames('col-4')}>
                <Row>
                    <Card className={classNames('widget-flat')}>

                        <HeaderForm title={'SOLICITUD DE COMITÉ DE EVALUACIÓN Y SEGUIMIENTO'} />
                        <Card.Body>
                        {!props?.aprendizError? <div className="isinvalid">SELECCIONE EL APRENDIZ</div>:<div>APRENDIZ:</div>}
                                    {children}
                            <Row className="align-items-center">
                                   
                                    <br/>
                                    <FormInput
                                        name="tipoComite"
                                        label="Seleccione el tipo de comité"
                                        type="select"
                                        containerClass="mb-3"
                                        className="form-select"
                                        key="tipoComite"
                                        isInvalid={!validateError.comiteError}
                                         onChange={(e) => onChangeTipoComite(
                                            e.target.value,true
                                          )}
                                    >
                                        <option value="ACADEMICO"> ACADEMICO</option>
                                        <option value="DISCIPLINARIO">DISCIPLINARIO</option>
                                    </FormInput>
                                     
                                    <FormInput
                                        name="tipoAtencion"
                                        label="Seleccione el tipo de Atencion"
                                        type="select"
                                        containerClass="mb-3 font-weight-bold"
                                        className="form-select"
                                        key="tipoAtencion"
                                        isInvalid={!validateError.tipoAtencionError}
                                        onChange={(e) => onChangeTipoAtencion(
                                            e.target.value,true
                                          )}
                      
                                    >
                                        <option>Seleccione...</option>
                                        <option >ACADEMICO</option>
                                        <option value="MEDIO-Leve"> -Leve</option>
                                        <option value="MEDIO-Grave"> -Grave</option>
                                        <option value="MEDIO-Gravísimas"> -Gravísimas</option>
                                        <option >DISCIPLINARIO</option>
                                        <option value="MEDIO-Leve"> -Leve</option>
                                        <option value="MEDIO-Grave"> -Grave</option>
                                        <option value="MEDIO-Gravísimas"> -Gravísimas</option>
                                    </FormInput>
                                    <div className="mb-3">
                                        <label>Fecha y Hora de los Hechos</label> <br />
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
                                                onDateChangefechaIncidente(date,true)
                                                }
                                        />
                                        
                                            {!validateError.fechaIncidenteError ? 
                                            <div className="isinvalid">
                                                 SELECCIONE LA FECHA Y HORA HECHOS
                                                 </div>: ''
                                             }
                                       
                                    </div>
                                    <div className="mb-3">
                                        <label>Fecha y Hora Propuesta para Agendar</label> <br />
                                        <HyperDatepicker
                                            name="fechaHoraPropuesta"
                                            hideAddon={true}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            tI={60}
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            timeCaption="time"
                                            className="form-control"
                                            value={selectedDatePropuesta}
                                            onChange={(date) =>
                                                onDateChangePropuesta(date,true)
                                                }
                                        />
                                        
                                            {!validateError.fechaPropuestaError ? 
                                            <div className="isinvalid">SELECCIONE LA FECHA Y HORA PROPUESTA</div>: ''}
                                       
                                    </div>
                            </Row>
                            <Row>
                                <Col>
                                         
                                    <Card>
                                    {!validateError.filesError && !validateError.base64StringsError ? <div className="isinvalid"><p className="text-white font-13 m-b-30">CARGUE LA EVIDENCIA EN PDF</p></div>:<h4 className="header-title mb-3">documento subido</h4>}
                                  
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
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
                <Row>
                    <div className="mb-3 mb-0 text-center btnenviarSolicitud">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('ENVIAR SOLICITUD')}
                        </Button>
                    </div>
                </Row>
            </VerticalForm>
        </>
    );
};

export default FormDatosIncidente;
