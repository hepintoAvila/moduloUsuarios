/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext, useEffect } from 'react';

import ConsultaNotificaciones from './ConsultaNotificaciones';
import AgendarCitas from './Calendar/AgendarCitas';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import encodeBasicUrl from '../../../../utils/encodeBasicUrl';
import { NotificacionesContext } from '../../../../layouts/context/NotificacionesProvider';
import LogoSena from '../ModuloSolicitudComite/Components/LogoSena';
import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';
import { useAdminUsuarios } from '../../../../hooks/useAdminUsuarios';

const ModuloNotificaciones = (props) => {
  const { tipo,itemUrl } = useContext(DashboardContext)
  const { itemsAgendarCitas,query } = useContext(NotificacionesContext)
  const {verificarPermiso} = useAdminUsuarios()
  useEffect(() => {
        query('ModuloNotificaciones', 'AgendarCitas', [{ opcion: encodeBasicUrl('AgendarCitas'), obj: 'agendarCitas',tipo:encodeBasicUrl('queryCitas')}]);
}, [query]);


  return (
    <React.Fragment>

      {(() => {
        switch (tipo) {
          case 'ConsultaNotificaciones':
            return <React.Fragment>
              {verificarPermiso('ConsultaNotificaciones',"query") ? (<ConsultaNotificaciones
                  accion={itemUrl}
                  tipo={tipo}
                />) :<PermisoAlert opcion={verificarPermiso('ConsultaNotificaciones',"query")}/>}
            </React.Fragment>
           case 'AgendarCitas':
            return <React.Fragment>
              {verificarPermiso('ConsultaNotificaciones',"add") ? (<AgendarCitas
                  accion={itemUrl}
                  tipo={tipo}
                  itemsAgendarCitas={itemsAgendarCitas}
                />) :<PermisoAlert opcion={verificarPermiso('ConsultaNotificaciones',"add")}/>}
            </React.Fragment>
          default:
            return (
              <React.Fragment>
                <LogoSena/>
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
