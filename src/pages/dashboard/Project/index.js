/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import Title from '../../../pages/dashboard/components/Title';
import { DashboardContext } from '../../../layouts/context/DashboardContext';
import { usePermisos } from '../../../hooks/usePermisos';
// PAGES
import PermisoAlert from '../components/PermisoAlert/PermisoAlert';
import BtnNivelI from '../components/BtnMenu/BtnNivelI';
import AdminUsuarios from './AdminUsuarios/AdminUsuarios';
import GestionMenu from './GestionMenu/GestionMenu';
import ModuloIncidentes from './ModuloIncidentes/ModuloIncidentes';


const ProjectDashboard = () => {

  const { tipo, AdvertenciaLocalStorage, itemUrl,setitemsMenuPrincipal } = useContext(DashboardContext)
  AdvertenciaLocalStorage();
  const { permisos, initPermiso } = usePermisos(tipo);

  const handleClick = () => {
    //
    const query = window.location.hash;
    setitemsMenuPrincipal('/ModuloIncidentes');
    if (query==='#/') {
      return window.location.hash = 'dashboard/ModuloIncidentes';
    }
  };

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
                />) : <PermisoAlert menssage={'Cargando...'} />}
            </React.Fragment>
          case 'ModuloIncidentes':
            return <React.Fragment>
                <ModuloIncidentes
                  accion={itemUrl}
                  tipo={tipo}
                  permisos={permisos}
                  handleClick={handleClick}

                />  
            </React.Fragment>
          default:
            return (
              <React.Fragment>
                <BtnNivelI handleClick={handleClick} menuRef={'ss'} />
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
