/* eslint-disable no-fallthrough */
/* eslint-disable no-duplicate-case */
import React from 'react';
import Actas from './Actas';

const ProjectDashboard = () => {

  return (
      <React.Fragment>
       <Actas />
      </React.Fragment>
  );
};

ProjectDashboard.defaultProps = {
  itemsmenu: '/',
};

export default ProjectDashboard;
