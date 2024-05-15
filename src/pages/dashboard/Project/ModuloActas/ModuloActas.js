/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import { usePermisos } from '../../../../hooks/usePermisos';
import Navbar from '../../components/Navbar';
import Actas from './Componentes/Actas'


const ModuloActas = () => {

  const { tipo,itemUrl } = useContext(DashboardContext)

  const { permisos } = usePermisos(tipo);

  return (
    <React.Fragment>
      <Navbar nivel={2} tipo={tipo}/>
      {(() => {
        switch (tipo) {
          case 'Actas':
            return <React.Fragment>
              <Actas
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
ModuloActas.defaultProps = {
  itemsmenu: '/',
};
export default ModuloActas;
