/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
//import { useHistory } from 'react-router-dom';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import { usePermisos } from '../../../../hooks/usePermisos';
import Navbar from '../../components/Navbar';
import ViewPdf from './Componentes/ViewPdf';
import Actas from './Actas'
import { NotificacionesContext } from '../../../../layouts/context/NotificacionesProvider';

const ModuloActas = () => {

 const { tipo, itemUrl} = useContext(DashboardContext)


  const { obtenerNumeroDesdeURL } = useContext(NotificacionesContext)
  const { permisos } = usePermisos(tipo);
  const idActa = obtenerNumeroDesdeURL(window.location.hash)
//onsole.log('imprimir',tipo,idActa,itemUrl);
  return (
    <React.Fragment>
      <Navbar nivel={2} tipo={tipo} />
      {(() => {
        switch (tipo) {
          case 'Actas':
            return <React.Fragment>
              <Actas
                accion={itemUrl}
                tipo={tipo}
                permisos={permisos}
              />
            </React.Fragment>
          case 'asistencia':
          case 'aprendices':
          case 'actas':
            return <React.Fragment>
              <Row style={{ marginTop: '-5em' }}>
              <Col sm={2}>

                </Col>
                <Col sm={10}>
                </Col>

              </Row>
              <br/>
              <ViewPdf
                accion={itemUrl}
                tipo={tipo}
                permisos={permisos}
                idActa={idActa}
              />
            </React.Fragment>
          default:
            return (
              <React.Fragment>
                {''}
              </React.Fragment>
            );
        }
      })()
      }
    </React.Fragment>
  );
};
ModuloActas.defaultProps = {
  itemsmenu: '/',
};
export default ModuloActas;
