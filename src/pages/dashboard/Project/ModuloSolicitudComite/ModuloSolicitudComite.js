/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React  from 'react';
//import { DashboardContext } from '../../../../layouts/context/DashboardContext';
//import { usePermisos } from '../../../../hooks/usePermisos';
import Navbar from '../ModuloNotificaciones/Components/Navbar';
import MenuSegundo from './Components/MenuSegundo';
import EnviarSolicitud from './EnviarSolicitud/EnviarSolicitud';
import ConsultarIncidente from './ConsultarIncidente/ConsultarIncidente';
import CarHistorialIncidencias from './ConsultarIncidente/CarHistorialIncidencias';
import ConsultarAprendiz from './ConsultarIncidente/ConsultarAprendiz';
 

const ModuloSolicitudComite = (props) => {
  return (
    <React.Fragment>
       <Navbar handleClick={props.handleClick} nivel={2}/>
      {(() => {
        switch (props.tipo) {
          case 'ModuloSolicitudComite':
            return <React.Fragment>
              <MenuSegundo handleClick={props.handleClick}/>
            </React.Fragment>
           case 'EnviarSolicitud':
            return <React.Fragment>
              <EnviarSolicitud handleClick={props.handleClick}/>
            </React.Fragment>   
            case 'ConsultarIncidencia':
              return <React.Fragment>
                <ConsultarIncidente/>
              </React.Fragment>  
              case 'ConsultaIncidente':  
                return <React.Fragment>
                  <CarHistorialIncidencias/>
                </React.Fragment> 
               case 'ConsultarAprendiz':  
               return <React.Fragment>
                 <ConsultarAprendiz/>
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
ModuloSolicitudComite.defaultProps = {
  itemsmenu: '/',
};
export default ModuloSolicitudComite;
