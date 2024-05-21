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

 const { tipo, itemUrl, setDropdownImprimir} = useContext(DashboardContext)
  const handleClose = (idActa) => {
    setDropdownImprimir(true);
    return window.location.hash = `#/dashboard/ModuloActas/Actas?p=${idActa}`;
};

  const { obtenerNumeroDesdeURL } = useContext(NotificacionesContext)
  const { permisos } = usePermisos(tipo);
  const idActa = obtenerNumeroDesdeURL(window.location.hash)
  //console.log('imprimir',tipo,idActa,itemUrl);
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
                  <Button
                    variant="success"
                    type="submit"
                    className="btnCerrar"
                    style={{ marginLeft: '0em', marginTop: '0em', width: '1.5em', height: '1.5em' }}
                    onClick={()=>handleClose(idActa)}><div style={{ marginLeft: '-0.4em', marginTop: '-0.5em' }}>X</div></Button>
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
