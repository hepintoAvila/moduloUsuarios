import React, { useContext } from 'react';

import AdminUsuarios from '../../AdminUsuarios/AdminUsuarios';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import GestionMenu from '../../GestionMenu';
import ModuloNotificaciones from '../../ModuloNotificaciones/';

import ModuloAprendiz from '../../ModuloAprendiz';
import BtnNivelI from '../../../components/BtnMenu/BtnNivelI';
import CambiarPassword from './CambiarPassword';
import ModuloSolicitudComite from '../../ModuloSolicitudComite';
import ModuloActas from '../ModuloActas';

//Context
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { useAdminUsuarios } from '../../../../../hooks/useAdminUsuarios';

const MenuModuloPrincipal= () => {
  const { tipo, AdvertenciaLocalStorage, itemUrl,setitemsMenuPrincipal,setitemsUrl } = useContext(DashboardContext)

  AdvertenciaLocalStorage();
  const {verificarPermiso} = useAdminUsuarios()

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
                {verificarPermiso('Usuarios',"query") ? (<AdminUsuarios
                  accion={itemUrl}
                  tipo={tipo}
               />) :<PermisoAlert opcion={verificarPermiso('Usuarios',"query")}/>}
            </React.Fragment>
          case 'GestionMenu':
            return <React.Fragment>
              {verificarPermiso('Menus',"query") ? (<GestionMenu
                  accion={itemUrl}
                  tipo={tipo}
                 />) :<PermisoAlert opcion={verificarPermiso('Menus',"query")}/>}
            </React.Fragment>
          case 'ModuloSolicitudComite':
            return <React.Fragment>
                <ModuloSolicitudComite
                  accion={itemUrl}
                  tipo={tipo}
                  handleClick={handleClick}
                />
            </React.Fragment>
           case 'ModuloNotificaciones':
            return <React.Fragment>
                 {verificarPermiso('ConsultaNotificaciones',"query") ? (<ModuloNotificaciones
                  accion={itemUrl}
                  tipo={tipo}
                  handleClick={handleClick}
                />) :<PermisoAlert opcion={verificarPermiso('ConsultaNotificaciones',"query")}/>}
            </React.Fragment>
            /*
            case 'AdministradorActas':
              return <React.Fragment>
                  {verificarPermiso('Actas',"query") ? <AdministradorActas
                    accion={itemUrl}
                    tipo={tipo}
                    handleClick={handleClick}
                  /> :<PermisoAlert opcion={verificarPermiso('Actas',"query")}/>}
              </React.Fragment>
            */
               case 'ModuloAprendiz':
                return <React.Fragment>
                    {verificarPermiso('Aprendiz',"query") ? (
                      <ModuloAprendiz
                      accion={itemUrl}
                      tipo={tipo}
                      handleClick={handleClick}
                    />) :<PermisoAlert opcion={verificarPermiso('Aprendiz',"query")}/>}
                </React.Fragment>
               case 'ModuloActas':
                return <React.Fragment>
                    {verificarPermiso('Aprendiz',"query") ? ( <ModuloActas
                      accion={itemUrl}
                      tipo={tipo}
                      handleClick={handleClick}
                    />) :<PermisoAlert opcion={verificarPermiso('Aprendiz',"query")}/>}
                </React.Fragment>
               case 'CambiarPassword':
                return <React.Fragment>
                    <CambiarPassword
                      accion={itemUrl}
                      tipo={tipo}

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
