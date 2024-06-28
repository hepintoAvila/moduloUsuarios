import React, { useContext } from 'react';

import AdminUsuarios from '../../AdminUsuarios/AdminUsuarios';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import GestionMenu from '../../GestionMenu';
import ModuloNotificaciones from '../../ModuloNotificaciones/';

import ModuloAprendiz from '../../ModuloAprendiz';
//import BtnNivelI from '../../../components/BtnMenu/BtnNivelI';
import CambiarPassword from './CambiarPassword';
import ModuloSolicitudComite from '../../ModuloSolicitudComite';
import ModuloActas from '../ModuloActas';

//Context
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { useAdminUsuarios } from '../../../../../hooks/useAdminUsuarios';
import Auditoria from '../../ModuloAuditoria/Auditoria';
import ModuloReportes from '../../ModuloReportes';

const MenuModuloPrincipal= (props) => {
  const { tipo,itemUrl,AdvertenciaLocalStorage,handleBtnPrincipal } = useContext(DashboardContext)

  AdvertenciaLocalStorage();
  const {verificarPermiso} = useAdminUsuarios()
//const {itemUrl} = props;
console.log('itemUrl',itemUrl);
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
                  handleClick={handleBtnPrincipal}
                />
            </React.Fragment>
           case 'ModuloNotificaciones':
            return <React.Fragment>
                 {verificarPermiso('ConsultaNotificaciones',"query") ? (<ModuloNotificaciones
                  accion={itemUrl}
                  tipo={tipo}
                  handleClick={handleBtnPrincipal}
                />) :<PermisoAlert opcion={verificarPermiso('ConsultaNotificaciones',"query")}/>}
            </React.Fragment>

            case 'ModuloAuditor':
              return <React.Fragment>
                  {verificarPermiso('Auditoria',"query") ? <Auditoria
                    accion={itemUrl}
                    tipo={tipo}
                      /> :<PermisoAlert opcion={verificarPermiso('Auditoria',"query")}/>}
              </React.Fragment>

               case 'ModuloAprendiz':
                return <React.Fragment>
                    {verificarPermiso('Aprendiz',"query") ? (
                      <ModuloAprendiz
                      accion={itemUrl}
                      tipo={tipo}
                      handleClick={handleBtnPrincipal}
                    />) :<PermisoAlert opcion={verificarPermiso('Aprendiz',"query")}/>}
                </React.Fragment>
               case 'ModuloActas':
                return <React.Fragment>
                    {verificarPermiso('Aprendiz',"query") ? ( <ModuloActas
                      accion={itemUrl}
                      tipo={tipo}
                      handleClick={handleBtnPrincipal}
                    />) :<PermisoAlert opcion={verificarPermiso('Aprendiz',"query")}/>}
                </React.Fragment>
               case 'CambiarPassword':
                return <React.Fragment>
                    <CambiarPassword
                      accion={itemUrl}
                      tipo={tipo}

                    />
                </React.Fragment>
                case 'ModuloReportes':
                return <React.Fragment>
                    <ModuloReportes
                      accion={itemUrl}
                      tipo={tipo}
                    />
                </React.Fragment>

          default:
            return (
              <React.Fragment>
              {}
               </React.Fragment>
            );
        }
      })()
      }
    </React.Fragment>
  );
};
export default MenuModuloPrincipal;
