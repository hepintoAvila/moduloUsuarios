/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import Title from '../../../pages/dashboard/components/Title';
import { DashboardContext } from '../../../layouts/context/DashboardContext';
import { usePermisos } from '../../../hooks/usePermisos';
// PAGES
import PermisoAlert from '../components/PermisoAlert/PermisoAlert';
import AdminUsuarios from './AdminUsuarios/AdminUsuarios';


const ProjectDashboard = () => {
  const { tipo, AdvertenciaLocalStorage, itemUrl } = useContext(DashboardContext)
  AdvertenciaLocalStorage();
  const { permisos, initPermiso } = usePermisos(tipo);
  return (
    <React.Fragment>
      <Title />
      {(() => {
        switch (itemUrl) {
          case 'AdminUsuarios':
            return <React.Fragment>
              {initPermiso === 1 ?
                (<AdminUsuarios
                  accion={itemUrl}
                  tipo={tipo}
                  permisos={permisos}
                />) : <PermisoAlert />}
            </React.Fragment>
          default:
            return (
              <React.Fragment>{''}</React.Fragment>
            );
        }
      })()
      }
    </React.Fragment>
  );
};
ProjectDashboard.defaultProps = {
  itemsmenu: '/',
};
export default ProjectDashboard;
