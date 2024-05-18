/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Card, Tab, Nav } from 'react-bootstrap';
import classnames from 'classnames';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import { useActas } from '../../../../../hooks/useActas'
import Recordatorio from '../AdministradorActas/FormActas/Recordatorio'
import Swal from 'sweetalert2';

const RegistrarActas = (props) => {
    const { getData } = useContext(NotificacionesContext);
    const { itemsConceptos, query } = useActas()
    const conceptos = itemsConceptos?.data || [];
    const [recordatorios, setRecordatorios] = useState({
        1: props?.objConceptos.hechos,
        2: props?.objConceptos.contemplacion,
        3: props?.objConceptos.frenteHechos,
        4: props?.objConceptos.recomendacion,
        5: props?.objConceptos.compromisos,
    });
    const [enviar, setEnviar] = useState(false);
    const [idConcepto, setidConcepto] = useState(0);
    const handleRecordatorioChange = (id, value) => {
        setRecordatorios(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    const titulos = [];
    titulos.push("Hechos");
    titulos.push("Contemplación del Caso");
    titulos.push("Frente a los hechos");
    titulos.push("Recomendación del Caso");
    titulos.push("Compromisos");


  useEffect(() => {
     if(enviar) {

      setTimeout(function () {
        if(idConcepto>0) {

          const datosEvent = {
            ...recordatorios,
            idActa: props.idActa,
            idSolicitud: props.idSolicitud,
            idConcepto: localStorage.getItem('idConcepto'),
            accion: 'ModuloActas',
            opcion: 'addConceptos',
            tipo: 'actas',
          };
          const queryDatos = Object.keys(datosEvent)
          .map((key) => key + '=' + btoa(datosEvent[key]))
          .join('&');
          if(datosEvent?.idConcepto>0) {
                getData(queryDatos);
                setEnviar(!enviar)
                setidConcepto(idConcepto);
                localStorage.removeItem('idConcepto');
          }
        }
    }, 2000);


      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enviar,idConcepto]);

    const handleSave = (id) => {
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Registro Enviado',
            showConfirmButton: false,
            timer: 1500,
        });
        setEnviar(!enviar)
        setidConcepto(id);
        localStorage.removeItem('idConcepto');
        localStorage.setItem('idConcepto', JSON.stringify(id));

    };

    const handleUpdate = (id) => {
        Swal.fire({
            position: 'top-center',
            icon: 'info',
            title: 'Registro Actualizado',
            showConfirmButton: false,
            timer: 1500,
        });
        setEnviar(!enviar)
        setidConcepto(id);

    };
    useEffect(() => {
      query('ModuloActas', 'actas', [{ opcion: btoa('listarConceptos'), obj: 'listarConceptos',idActa: btoa(props.idActa),idSolicitud:btoa(props.idSolicitud)}]);
    }, [query]);


    useEffect(() => {

      if(conceptos?.length>0){
        setRecordatorios({
          1: conceptos[0]?.hechos,
          2: conceptos[0]?.contemplacion,
          3: conceptos[0]?.frenteHechos,
          4: conceptos[0]?.recomendacion,
          5: conceptos[0]?.compromisos,
      })
      }
    }, [conceptos]);

    console.log('itemsUpdate',recordatorios)

    return (
  <React.Fragment>
            <Tab.Container defaultActiveKey="1">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Nav as="ul" variant="pills" className="nav nav-pills bg-nav-pills nav-justified mb-3">
                                    {[1, 2, 3, 4, 5].map(id => (
                                        <Nav.Item as="li" key={id} className="nav-item">
                                            <Nav.Link href="#" eventKey={id.toString()} className="nav-link rounded-0">
                                                <i className={classnames('mdi mdi-book-account-outline', 'font-18')}></i>
                                                <span className="d-none d-lg-block">{titulos[id-1]}</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>

                                <Row>
                                    <Col lg={12}>
                                        <Tab.Content>
                                            {[1, 2, 3, 4, 5].map(index => (
                                                <Tab.Pane key={index} eventKey={index.toString()}>
                                                    <Recordatorio
                                                        id={index.toString()}
                                                        titulo={titulos[index-1]}
                                                        value={recordatorios[index]}
                                                        onChange={handleRecordatorioChange}
                                                        handleSave={() => handleSave(index)}
                                                        handleUpdate={() => handleUpdate(index)}
                                                    />
                                                </Tab.Pane>
                                            ))}
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Tab.Container>
        </React.Fragment>

    );
};

export default RegistrarActas;
