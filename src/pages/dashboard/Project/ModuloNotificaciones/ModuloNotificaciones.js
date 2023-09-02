/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
//import PermisoAlert from '../components/PermisoAlert/PermisoAlert';
import ConsultaNotificaciones from './ConsultaNotificaciones';
import { usePermisos } from '../../../../hooks/usePermisos';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
 
import Navbar from './Navbar';
import AgendarCitas from './Calendar/AgendarCitas';
 
const ModuloNotificaciones = () => {

  const { tipo, itemUrl } = useContext(DashboardContext)
 
  const { permisos } = usePermisos(tipo);


console.log('itemUrlInicio',tipo)
  return (
    <React.Fragment>
      <Navbar/>
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
              <AgendarCitas/>
            </React.Fragment>

           default:
            return (
              <React.Fragment>{''} </React.Fragment>
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
