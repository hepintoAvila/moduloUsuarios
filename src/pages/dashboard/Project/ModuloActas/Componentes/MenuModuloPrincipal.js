import React, { useContext } from 'react';

import AdminUsuarios from '../../AdminUsuarios/AdminUsuarios';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import GestionMenu from '../../GestionMenu/GestionMenu';
import ModuloSolicitudComite from '../../ModuloSolicitudComite/ModuloSolicitudComite';
import ModuloNotificaciones from '../../ModuloNotificaciones/ModuloNotificaciones';
import AdministradorActas from '../AdministradorActas/AdministradorActas';
import ModuloAprendiz from '../../ModuloAprendiz/ModuloAprendiz';
import ModuloActas from '../ModuloActas';
import BtnNivelI from '../../../components/BtnMenu/BtnNivelI';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { usePermisos } from '../../../../../hooks/usePermisos';

import CambiarPassword from './CambiarPassword';

//import {filtrarURLNumero,filtrarURLSeccion} from '../../../helpers/menu';
// PAGES

const MenuModuloPrincipal= () => {
  const { tipo, AdvertenciaLocalStorage, itemUrl,setitemsMenuPrincipal,setitemsUrl } = useContext(DashboardContext)

  AdvertenciaLocalStorage();
  const { permisos, initPermiso } = usePermisos(tipo);

  const handleClick = (url,nivel) => {
   if(url?.length>0){
      if(nivel===1){
      setitemsMenuPrincipal(url);
      setitemsUrl(url);
        return window.location.hash = `dashboard/${url}`
      }else{
        const menuitems = window.location.hash.split('#/')[1];
        const [seccion] = menuitems?.split('/');

        const obj = {principal:seccion.length===0 ? `dashboard/${url}`:seccion, seccion: url}
        sessionStorage.setItem('ITEM_SELECT', JSON.stringify({
          tipo: obj.principal,
          menu: obj.seccion}));
        const urltemp = obj.seccion?.split('/');
        setitemsMenuPrincipal(urltemp[1]);
        setitemsUrl(urltemp[0]);
        const urls = `dashboard/${url}`;
          return window.location.hash = urls;
      }

    }
  };

  return (
    <React.Fragment>

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
          case 'ModuloSolicitudComite':
            return <React.Fragment>
                <ModuloSolicitudComite
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
               case 'ModuloAprendiz':
                return <React.Fragment>
                    <ModuloAprendiz
                      accion={itemUrl}
                      tipo={tipo}
                      permisos={permisos}
                      handleClick={handleClick}
                    />
                </React.Fragment>
               case 'ModuloActas':
                return <React.Fragment>
                    <ModuloActas
                      accion={itemUrl}
                      tipo={tipo}
                      permisos={permisos}
                      handleClick={handleClick}
                    />
                </React.Fragment>
               case 'CambiarPassword':
                return <React.Fragment>
                    <CambiarPassword
                      accion={itemUrl}
                      tipo={tipo}
                      permisos={permisos}
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
export default MenuModuloPrincipal;
