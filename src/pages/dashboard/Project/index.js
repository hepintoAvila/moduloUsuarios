/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import Title from '../../../pages/dashboard/components/Title';
import { DashboardContext } from '../../../layouts/context/DashboardContext';
import { usePermisos } from '../../../hooks/usePermisos';
//import {filtrarURLNumero,filtrarURLSeccion} from '../../../helpers/menu';
// PAGES
import PermisoAlert from '../components/PermisoAlert/PermisoAlert';
import BtnNivelI from '../components/BtnMenu/BtnNivelI';
import AdminUsuarios from './AdminUsuarios/AdminUsuarios';
import GestionMenu from './GestionMenu/GestionMenu';
import ModuloIncidentes from './ModuloIncidentes/ModuloIncidentes';
import ModuloNotificaciones from './ModuloNotificaciones/ModuloNotificaciones';
import AdministradorActas from './AdministradorActas/AdministradorActas';

const ProjectDashboard = () => {

  const { tipo, AdvertenciaLocalStorage, itemUrl,setitemsMenuPrincipal } = useContext(DashboardContext)
  AdvertenciaLocalStorage();
  const { permisos, initPermiso } = usePermisos(tipo);

  const handleClick = (url,nivel) => {
    
    setitemsMenuPrincipal(`/${url}`);
        const menuitems = window.location.hash.split('#/')[1]; 
        const [seccion] = menuitems?.split('/');
        
        const strurl = (nivel===2||nivel===3)? `/${seccion}/${url}` : `${seccion}`
        
        const obj = {principal:seccion.length===0 ? `dashboard/${url}`:seccion, seccion: url}
        sessionStorage.setItem('ITEM_SELECT', JSON.stringify({ 
          tipo: obj.principal, 
          menu: obj.seccion,
          tipoAnterior:'dashboard/',
          menuAnterior:'dashboard/' }));
        const urls = seccion.length===0 ? `dashboard/${url}`:'/'+seccion+'/'+url
        return window.location.hash = urls;

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
           case 'ModuloNotificaciones':
            return <React.Fragment>
                <ModuloNotificaciones
                  accion={itemUrl}
                  tipo={tipo}
                  permisos={permisos}
                  handleClick={handleClick}
                />  
            </React.Fragment> 
            case 'AdministradorActas':
              return <React.Fragment>
                  <AdministradorActas
                    accion={itemUrl}
                    tipo={tipo}
                    permisos={permisos}
                    handleClick={handleClick}
                  />  
              </React.Fragment>            
          default:
            return (
              <React.Fragment>
                {itemUrl.length===0?<BtnNivelI handleClick={handleClick} menuRef={''} />:''}
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
