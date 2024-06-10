/* eslint-disable no-duplicate-case */
import React  from 'react';

import MenuModuloPrincipal from './ModuloActas/Componentes/MenuModuloPrincipal';

const ProjectDashboard = () => {

  return (
    <React.Fragment>
        <MenuModuloPrincipal />
    </React.Fragment>
  );
};

ProjectDashboard.defaultProps = {
  itemsmenu: '/',
};

export default ProjectDashboard;
