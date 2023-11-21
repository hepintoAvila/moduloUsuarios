/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext, useEffect } from 'react';

import ConsultaNotificaciones from './ConsultaNotificaciones';
import AgendarCitas from './Calendar/AgendarCitas';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import { usePermisos } from '../../../../hooks/usePermisos';
import Navbar from '../../components/Navbar';
import encodeBasicUrl from '../../../../utils/encodeBasicUrl';
import { NotificacionesContext } from '../../../../layouts/context/NotificacionesProvider';


const ModuloNotificaciones = (props) => {
  const { tipo,itemUrl } = useContext(DashboardContext)
  const { itemsAgendarCitas,query } = useContext(NotificacionesContext)
  const { permisos } = usePermisos(tipo);
  useEffect(() => {
        query('ModuloNotificaciones', 'AgendarCitas', [{ opcion: encodeBasicUrl('AgendarCitas'), obj: 'agendarCitas',tipo:encodeBasicUrl('queryCitas')}]);
}, []);


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
                  itemsAgendarCitas={itemsAgendarCitas}
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
