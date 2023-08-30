/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import Title from '../../../pages/dashboard/components/Title';
import { DashboardContext } from '../../../layouts/context/DashboardContext';
import { usePermisos } from '../../../hooks/usePermisos';
// PAGES
import PermisoAlert from '../components/PermisoAlert/PermisoAlert';
import MenuBtn from '../components/MenuBtn';
import AdminUsuarios from './AdminUsuarios/AdminUsuarios';
import GestionMenu from './GestionMenu/GestionMenu';
import avatar1 from '../../../assets/images/1.png';
import avatar2 from '../../../assets/images/2.png';
import avatar3 from '../../../assets/images/3.png';

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
                />) : <PermisoAlert menssage={'Cargando...'}/>}
            </React.Fragment>
          case 'GestionMenu':
            return <React.Fragment>
              {initPermiso === 1 ?
                (<GestionMenu
                  accion={itemUrl}
                  tipo={tipo}
                  permisos={permisos}
                />) : <PermisoAlert menssage={'Cargando...'}/>}
            </React.Fragment>
          default:
            return (
              <React.Fragment>
                <div class="grid_contenedor">
                  <div class="grid_btn1">
                    <MenuBtn texto='Módulo Incidentes' image={avatar3}/>
                  </div>
                  <div class="grid_btn2">
                    <MenuBtn texto='Consulta Notificaciones' image={avatar2}/>

                  </div>
                  <div class="grid_btn3">
                    <MenuBtn texto='Módulo de Reportes' image={avatar1}/>
                  </div>
                </div> 
               </React.Fragment>
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
