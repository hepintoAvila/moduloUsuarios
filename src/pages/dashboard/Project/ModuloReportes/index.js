/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import LogoSena from '../ModuloSolicitudComite/Components/LogoSena';
import BuscadorFecha from './Components/BuscadorFecha';

import SolicitudesGraficas from './SolicitudesGraficas';

//import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';


const ModuloReportes = () => {
 // const {verificarPermiso} = useAdminUsuarios()
  const { tipo,itemUrl} = useContext(DashboardContext)
  return (
    <React.Fragment>
      {(() => {
        switch (tipo) {
          case 'ReportesComite':
            return <React.Fragment>
              <BuscadorFecha/>
              <SolicitudesGraficas
                  accion={itemUrl}
                  tipo={tipo}
                />
              {'xxx'}
              {
                /*
              {verificarPermiso('Aprendiz',"query") ?
              <Aprendiz
                  accion={itemUrl}
                  tipo={tipo}
                />:<PermisoAlert opcion={verificarPermiso('Aprendiz',"query")}/>}
                */
              }

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
ModuloReportes.defaultProps = {
  itemsmenu: '/dashboard/ModuloReportes',
};
export default ModuloReportes;
