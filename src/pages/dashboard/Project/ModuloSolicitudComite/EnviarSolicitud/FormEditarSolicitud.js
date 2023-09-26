// @flow
import React, {useContext,useEffect,useState } from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { Button,Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2'
// components
import { VerticalForm, FormInput } from '../../../../../components';
import HyperDatepicker from '../../../../../components/Datepicker';
import FileUploader from '../../../../../components/FileUploader';
 
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
import FormDatosAprendiz from './FormDatosAprendiz';
//import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';
//import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';

function contarVerdaderos(array) {
    let contador = 0;
    for (let i = 0; i <= array.length; i++) {
      if (array[i] === true) {
        contador++;
      }
    }
    return contador;
  }
const FormEditarSolicitud = (props): React$Element<React$FragmentType> => {
    const children = props.children || null;
    const childrenEvidencias = props.childrenEvidencias || null;
    const childrenAprendiz = props.childrenAprendiz || null;
    const [selectedDate, setSelectedDate] = useState(new Date());
 
    const {validateError,setError,queryFile,loading,nombrePrograma,descripcion,fallas} = useContext(SearchContext)
    const datosAprendiz = props?.itemsConsultarSolicitudByCodigo?.data?.Solicitudes || []
    //console.log({...fallas[0]})
    
    const [items, setItems] = useState([{
        idAprendiz: '',
        tipoComite: '',
        tipoAtencion: '',
        fechaIncidente: '',
        accion: 'ModuloSolicitudComite',
        opcion: 'add_solicitud',
        tipo: 'EnviarSolicitud',
        selectedFile:'',
        base64String:'',
        descripcion:'',
        nombrePrograma:'',

    }]);
 
    const { t } = useTranslation();
    const schemaResolver = yupResolver(
        yup.object().shape({
        })
      );
      const onSubmit = () => {
        const obj = Object.values({...validateError})
        let numtrue = contarVerdaderos(obj)

        if(Number(numtrue)===8){
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Solicitud Enviada',
                showConfirmButton: false,
                timer: 1500
              })
        const datosfiles = 
            {
                idAprendiz:items[0].idAprendiz,
                tipoComite:items[0].tipoComite,
                tipoAtencion:items[0].tipoAtencion,
                fechaIncidente:items[0].fechaIncidente,
                accion: 'ModuloSolicitudComite',
                opcion: 'add_solicitud',
                tipo: 'EnviarSolicitud',
                selectedFile:items[0].selectedFile,
                descripcion:items[0].descripcion,
                nombrePrograma:items[0].nombrePrograma,
                ...fallas[0],    
                
            }
           
            const queryDatos = datosfiles
            ? Object.keys(datosfiles)
              .map((key) => key + '=' + btoa(datosfiles[key]))
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


      const onDateChangefechaIncidente = (date,fechaError) => {
        if (date) {
            setSelectedDate(date);
            setError({...validateError,fechaError:fechaError})
            setItems([{
                ...items[0], fechaIncidente:date,
                idAprendiz:props?.idAprendiz,
                descripcion:descripcion,
                nombrePrograma:nombrePrograma
              }])
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
                descripcion:descripcion,
                nombrePrograma:nombrePrograma
              }])
        }
    };
    const onChangeTipoAtencion= (value,tipoAtencionError) => {
        if (value) {
            setError({...validateError,tipoAtencionError:tipoAtencionError})
            setItems([{
                ...items[0], 
                tipoAtencion: value,
                idAprendiz:props?.idAprendiz,
                descripcion:descripcion,
                nombrePrograma:nombrePrograma
              }])
        }
    };
        const onChangeTipoComite= (value,comiteError) => {
        if (value) {
            setError({...validateError,comiteError:comiteError})
            setItems([{
                ...items[0], 
                tipoComite:value,
                idAprendiz:props?.idAprendiz,
                descripcion:descripcion,
                nombrePrograma:nombrePrograma
              }])
        }
    };
    useEffect(() => {
        const obj = [{
            ...items[0], 
            descripcion:descripcion,
        }]
        setItems(obj)
    }, [descripcion]);

    useEffect(() => {
        const objnombrePrograma = [{
            ...items[0], 
            nombrePrograma:nombrePrograma,
        }]
        setItems(objnombrePrograma)
    }, [nombrePrograma]);

    useEffect(() => {
        if(datosAprendiz.length===1){
            const objet =[{
                idAprendiz: datosAprendiz[0]?.idAprendiz,
                aprendiz: datosAprendiz[0]?.aprendiz,
                tipoComite: datosAprendiz[0]?.tipoSolicitud,
                tipoAtencion: datosAprendiz[0]?.tipoAtencion,
                fechaIncidente:'',
                fechaHora:datosAprendiz[0]?.fechaHora,
                accion: 'ModuloSolicitudComite',
                opcion: 'add_solicitud',
                tipo: 'EnviarSolicitud',
                selectedFile:'',
                base64String:'',
                descripcion:datosAprendiz[0]?.description,
                nombrePrograma:datosAprendiz[0]?.nombrePrograma,
                sancionesAprendiz:datosAprendiz[0]?.sancionesAprendiz,
            }]
            setItems(objet)
        }
    }, [datosAprendiz]);

    
    console.log({...items})
    return (
        <>
            {loading ? (
                <Redirect to={`/ModuloSolicitudComite/EnviarSolicitud?p=${items[0]?.idAprendiz}`}></Redirect>
            ) : null}
            <VerticalForm
                onSubmit={onSubmit}
                resolver={schemaResolver}
                defaultValues={{}}
                className={classNames('col-4')}>

                <Row className={classNames('zIndex')}>
                    <Card className={classNames('widget-flat')}>
                        <Card.Body>
                        <label className={classNames('editTitulos')}><i class="mdi mdi-account-check mb-4"></i>{items[0]?.aprendiz}</label>    
                        {children}
                            {!props?.aprendizError ? (
                                <div className="isinvalid">SELECCIONE EL APRENDIZ</div>
                            ) : (
                                null
                            )}
                        <FormDatosAprendiz handleClick={props.handleClick} datosAprendiz={props.datosAprendiz} swEdit={1} edit={items} />
                        </Card.Body>
                    </Card>
                </Row>

                
                <Row>
                    <Card className={classNames('widget-flat')}>
                        <Card.Body>
                            <Row className="align-items-center">
                                <br />
                                <label> Seleccione el tipo de falta:</label>
                                <label className={classNames('editTitulos')}><i class="mdi mdi-account-check"></i>{items[0]?.tipoComite}</label> 
                                <FormInput
                                    name="tipoComite"
                                    label=""
                                    type="select"
                                    containerClass="mb-3"
                                    className="form-select"
                                    key="tipoComite"
                                    isInvalid={!validateError.comiteError}
                                    onChange={(e) => onChangeTipoComite(e.target.value, true)}>
                                    <option value="ACADEMICO"> ACADEMICO</option>
                                    <option value="DISCIPLINARIO">DISCIPLINARIO</option>
                                    <option value="ACADEMICO Y DISCIPLINARIO">ACADEMICO Y DISCIPLINARIO</option>
                                </FormInput>
                                <label>Seleccione la calificación de la falta:</label>
                                <label className={classNames('editTitulos')}><i class="mdi mdi-account-check"></i>{items[0]?.tipoAtencion}</label>    
                                <FormInput
                                    name="tipoAtencion"
                                    label=""
                                    type="select"
                                    containerClass="mb-3 font-weight-bold"
                                    className="form-select"
                                    key="tipoAtencion"
                                    isInvalid={!validateError.tipoAtencionError}
                                    onChange={(e) => onChangeTipoAtencion(e.target.value, true)}>
                                    <option>Seleccione...</option>
                                    <option value="Leve">Leve</option>
                                    <option value="Grave">Grave</option>
                                    <option value="Gravísimas">Gravísimas</option>
                                </FormInput>
                                <label>Fecha y Hora de los Hechos:</label>
                                <label className={classNames('editTitulos')}><i class="mdi mdi-account-check"></i>{items[0]?.fechaHora}</label> 
                                <div className="mb-3">
                                    <HyperDatepicker
                                        label=""
                                        name="fechaIncidente"
                                        hideAddon={true}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        tI={60}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                        className="form-control"
                                        value={selectedDate}
                                        onChange={(date) => onDateChangefechaIncidente(date, true)}
                                    />
                                    {!validateError.fechaError ? (
                                        <div className="isinvalid">SELECCIONE LA FECHA Y HORA HECHOS</div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </Row>
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
                                                            new Uint8Array(reader.result).reduce(
                                                                (data, byte) => data + String.fromCharCode(byte),
                                                                ''
                                                            )
                                                        );

                                                        onDateChangeFile(
                                                            JSON.stringify(file),
                                                            base64String,
                                                            true,
                                                            true
                                                        );
                                                    };

                                                    //
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
                            <Row>
                                <Col>
                                    <label className={classNames('editTitulos')}><i class="mdi mdi-account-check"></i>{items[0]?.descripcion}</label> 
                                    <div className="mb-3">{childrenEvidencias}</div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
                <br />
                <br />
                <Row>
                    <div className="mb-3 mb-0 text-center btnenviarSolicitud">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('ACTUALIZAR SOLICITUD')}
                        </Button>
                    </div>
                </Row>
            </VerticalForm>
        </>
    );
};

export default FormEditarSolicitud;
