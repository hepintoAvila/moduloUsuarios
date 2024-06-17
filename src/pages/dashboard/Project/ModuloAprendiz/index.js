/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import { usePermisos } from '../../../../hooks/usePermisos';
//import Navbar from '../../components/Navbar';
import Aprendiz from './Aprendiz/Aprendiz'
import LogoSena from '../ModuloSolicitudComite/Components/LogoSena';


const ModuloAprendiz = () => {

  const { tipo,itemUrl } = useContext(DashboardContext)

  const { permisos } = usePermisos(tipo);

  return (
    <React.Fragment>

      {(() => {
        switch (tipo) {
          case 'Aprendiz':
            return <React.Fragment>
              <Aprendiz
                  accion={itemUrl}
                  tipo={tipo}
                  permisos={permisos}
                />
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
ModuloAprendiz.defaultProps = {
  itemsmenu: '/dashboard/ModuloAprendiz',
};
export default ModuloAprendiz;
