/* eslint-disable no-duplicate-case */
import React, { useContext }  from 'react';
import Inbox from './ModuloEmail/Inbox';
import MenuModuloPrincipal from './ModuloActas/Componentes/MenuModuloPrincipal';
import { DashboardContext } from '../../../layouts/context/DashboardContext';

const ProjectDashboard = () => {
  const {itemUrl,tipo } = useContext(DashboardContext)
  let userInfo = sessionStorage.getItem('hyper_user');
  const user = JSON.parse(userInfo);
  //console.log(user);
  return (
    <React.Fragment>
        {user[0]?.role==='Aprendiz' ? <Inbox />: <MenuModuloPrincipal
                   accion={itemUrl}
                   tipo={tipo}
        />}
    </React.Fragment>
  );
};

ProjectDashboard.defaultProps = {
  itemsmenu: '/',
};

export default ProjectDashboard;
