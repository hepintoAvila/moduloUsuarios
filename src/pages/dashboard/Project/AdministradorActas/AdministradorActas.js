/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import { usePermisos } from '../../../../hooks/usePermisos';
import ConsultaActas from './ConsultaActas';
import RegistrarActas from './RegistrarActas';
import Navbar from '../ModuloNotificaciones/Components/Navbar';

const AdministradorActas = () => {

  const { tipo,itemUrl } = useContext(DashboardContext)

  const { permisos } = usePermisos(tipo);
 
  return (
    <React.Fragment>
       <Navbar/>
      {(() => {
        switch (tipo) {
          case 'ConsultaActas':
            return <React.Fragment>
              <ConsultaActas
                  accion={itemUrl}
                  tipo={tipo}
                  permisos={permisos}
                />
            </React.Fragment>
           case 'RegistrarActa':
            return <React.Fragment>
              <RegistrarActas
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
AdministradorActas.defaultProps = {
  itemsmenu: '/',
};
export default AdministradorActas;
