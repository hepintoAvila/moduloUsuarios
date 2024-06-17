/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React  from 'react';
import MenuSegundo from './Components/MenuSegundo';
import EnviarSolicitud from './EnviarSolicitud/EnviarSolicitud';
import ConsultarIncidente from './ConsultarIncidente/ConsultarIncidente';
import CarHistorialIncidencias from './ConsultarIncidente/CarHistorialIncidencias';
import ConsultarAprendiz from './ConsultarIncidente/ConsultarAprendiz';
import LogoSena from './Components/LogoSena';




const ModuloSolicitudComite = (props) => {
  return (
    <React.Fragment>

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
               <LogoSena/>
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
