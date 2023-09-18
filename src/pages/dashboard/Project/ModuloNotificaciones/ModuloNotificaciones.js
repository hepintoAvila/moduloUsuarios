/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
 
import ConsultaNotificaciones from './ConsultaNotificaciones';
import AgendarCitas from './Calendar/AgendarCitas';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import { usePermisos } from '../../../../hooks/usePermisos';
import Navbar from '../../components/Navbar';
 

const ModuloNotificaciones = (props) => {
  const { tipo,itemUrl } = useContext(DashboardContext)
  const { permisos } = usePermisos(tipo);
 
  return (
    <React.Fragment>
 <Navbar nivel={2} tipo={props.tipo}/>
      {(() => {
        switch (tipo) {
          case 'ConsultaNotificaciones':
            return <React.Fragment>
              <ConsultaNotificaciones
                  accion={itemUrl}
                  tipo={tipo}
                  permisos={permisos}
                />
            </React.Fragment>
           case 'AgendarCitas':
            return <React.Fragment>
              <Navbar tipo={tipo} nivel={2}/>
              <AgendarCitas
                  accion={itemUrl}
                  tipo={tipo}
                  permisos={permisos}
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
ModuloNotificaciones.defaultProps = {
  itemsmenu: '/',
};
export default ModuloNotificaciones;
