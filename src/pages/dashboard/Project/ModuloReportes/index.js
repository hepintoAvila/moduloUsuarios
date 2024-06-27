/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import LogoSena from '../ModuloSolicitudComite/Components/LogoSena';
import BuscadorFecha from './Components/BuscadorFecha';

import SolicitudesGraficas from './SolicitudesGraficas';
import { SearchContext } from '../../../../layouts/context/SearchContext';

//import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';


const ModuloReportes = () => {
 // const {verificarPermiso} = useAdminUsuarios()
  const { tipo,itemUrl} = useContext(DashboardContext)
  const { itemsGraficos} = useContext(SearchContext)

  return (
    <React.Fragment>
      {(() => {
        switch (tipo) {
          case 'ReportesComite':
          case 'ReporteIncidente':
          case 'ReportesIncidentes':
            return <React.Fragment>
              <BuscadorFecha/>
              <SolicitudesGraficas
                  accion={itemUrl}
                  tipo={tipo}
                  itemsGraficos={itemsGraficos}
                />
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
