/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import { usePermisos } from '../../../../hooks/usePermisos';
import Navbar from '../../components/Navbar';
import Aprendiz from '../ModuloAprendiz/Aprendiz/Aprendiz'


const ModuloAprendiz = () => {

  const { tipo,itemUrl } = useContext(DashboardContext)

  const { permisos } = usePermisos(tipo);

  return (
    <React.Fragment>
      <Navbar nivel={2} tipo={tipo}/>
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
                {''}
                </React.Fragment>
            );
        }
      })()
      }
    </React.Fragment>
  );
};
ModuloAprendiz.defaultProps = {
  itemsmenu: '/',
};
export default ModuloAprendiz;
