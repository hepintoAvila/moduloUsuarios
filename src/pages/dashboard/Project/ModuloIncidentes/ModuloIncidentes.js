/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
//import { usePermisos } from '../../../../hooks/usePermisos';
import Navbar from '../ModuloNotificaciones/Components/Navbar';
import MenuSegundo from './Components/MenuSegundo';
import EnviarSolicitud from './EnviarSolicitud/EnviarSolicitud';
import ConsultarIncidente from './ConsultarIncidente/ConsultarIncidente';
 

const ModuloIncidentes = () => {
  const { tipo,setitemsMenuPrincipal } = useContext(DashboardContext)

  const handleClick = (url) => {
    setitemsMenuPrincipal(`/${url}`);
        const menuitems = window.location.hash.split('#/')[1];
        const [seccion] = menuitems?.split('/');
        
        const obj = {principal:seccion.length===0 ? `dashboard/${url}`:seccion, seccion: url}
        sessionStorage.setItem('ITEM_SELECT', JSON.stringify({ tipo: obj.principal, menu: obj.seccion }));
        const urls = seccion.length===0 ? `dashboard/${url}`:'/'+seccion+'/'+url
        return window.location.hash = urls;

  };
 

 // const { permisos } = usePermisos(tipo);
 
  return (
    <React.Fragment>
       <Navbar/>
      {(() => {
        switch (tipo) {
          case 'ModuloIncidentes':
            return <React.Fragment>
              <MenuSegundo handleClick={handleClick}/>
            </React.Fragment>
           case 'EnviarSolicitud':
            return <React.Fragment>
              <EnviarSolicitud/>
            </React.Fragment>   
            case 'ConsultarIncidencia':
              return <React.Fragment>
                <ConsultarIncidente/>
              </React.Fragment>              
          default:
            return (
              <React.Fragment>
                {''}
                </React.Fragment>
            );
        }
      })()
      }
    </React.Fragment>
  );
};
ModuloIncidentes.defaultProps = {
  itemsmenu: '/',
};
export default ModuloIncidentes;
