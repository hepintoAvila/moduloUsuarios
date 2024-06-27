/* eslint-disable no-duplicate-case */
import React, { useContext } from 'react';
//import Inbox from './ModuloEmail/Inbox';
import MenuModuloPrincipal from './ModuloActas/Componentes/MenuModuloPrincipal';
import { DashboardContext } from '../../../layouts/context/DashboardContext';

const ProjectDashboard = () => {
  const { itemUrl, tipo } = useContext(DashboardContext);
  //let userInfo = sessionStorage.getItem('hyper_user');
  //const user = JSON.parse(userInfo);
  //const userRole = user && user[0] && user[0].role;

  return (
    <React.Fragment>

        <MenuModuloPrincipal accion={itemUrl} tipo={tipo} />

    </React.Fragment>
  );
};

ProjectDashboard.defaultProps = {
  itemsmenu: '/',
};

export default ProjectDashboard;

