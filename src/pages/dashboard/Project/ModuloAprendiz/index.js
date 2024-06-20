/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
//import Navbar from '../../components/Navbar';
import Aprendiz from './Aprendiz/Aprendiz'
import LogoSena from '../ModuloSolicitudComite/Components/LogoSena';
import { useAdminUsuarios } from '../../../../hooks/useAdminUsuarios';
import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';


const ModuloAprendiz = () => {
  const {verificarPermiso} = useAdminUsuarios()
  const { tipo,itemUrl } = useContext(DashboardContext)
  return (
    <React.Fragment>
      {(() => {
        switch (tipo) {
          case 'Aprendiz':
            return <React.Fragment>
             {verificarPermiso('Aprendiz',"query") ? <Aprendiz
                  accion={itemUrl}
                  tipo={tipo}
                />:<PermisoAlert opcion={verificarPermiso('Aprendiz',"query")}/>}
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
