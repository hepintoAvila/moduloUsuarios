import React, { useContext } from 'react';
import AdminUsuarios from '../Project/AdminUsuarios/AdminUsuarios';
import PermisoAlert from '../components/PermisoAlert/PermisoAlert';
import GestionMenu from '../Project/GestionMenu';
import ModuloSolicitudComite from '../Project/ModuloSolicitudComite';
import ModuloNotificaciones from '../Project/ModuloNotificaciones';
import Auditoria from '../Project/ModuloAuditoria/Auditoria';
import ModuloAprendiz from '../Project/ModuloAprendiz';
import ModuloActas from '../Project/ModuloActas/ModuloActas';
import CambiarPassword from '../Project/ModuloActas/Componentes/CambiarPassword';
import ModuloReportes from '../Project/ModuloReportes';

import { DashboardContext } from '../../../layouts/context/DashboardContext';
import { useAdminUsuarios } from '../../../hooks/useAdminUsuarios';

const ModulosPrincipales = () => {
  const { tipo, itemUrl, AdvertenciaLocalStorage, handleBtnPrincipal } = useContext(DashboardContext);

  // Ejecuta la advertencia del almacenamiento local
  AdvertenciaLocalStorage();

  // Hook para verificar permisos de administración de usuarios
  const { verificarPermiso } = useAdminUsuarios();

  // Función para renderizar el componente según itemUrl
  const renderComponent = () => {
    switch (itemUrl) {
      case 'AdminUsuarios':
        return verificarPermiso('Usuarios', 'query') ? (
          <AdminUsuarios accion={itemUrl} tipo={tipo} />
        ) : (
          <PermisoAlert opcion={verificarPermiso('Usuarios', 'query')} />
        );

      case 'GestionMenu':
        return verificarPermiso('Menus', 'query') ? (
          <GestionMenu accion={itemUrl} tipo={tipo} />
        ) : (
          <PermisoAlert opcion={verificarPermiso('Menus', 'query')} />
        );

      case 'ModuloSolicitudComite':
        return <ModuloSolicitudComite accion={itemUrl} tipo={tipo} handleClick={handleBtnPrincipal} />;

      case 'ModuloNotificaciones':
        return verificarPermiso('ConsultaNotificaciones', 'query') ? (
          <ModuloNotificaciones accion={itemUrl} tipo={tipo} handleClick={handleBtnPrincipal} />
        ) : (
          <PermisoAlert opcion={verificarPermiso('ConsultaNotificaciones', 'query')} />
        );

      case 'ModuloAuditor':
        return verificarPermiso('Auditoria', 'query') ? (
          <Auditoria accion={itemUrl} tipo={tipo} />
        ) : (
          <PermisoAlert opcion={verificarPermiso('Auditoria', 'query')} />
        );

      case 'ModuloAprendiz':
        return verificarPermiso('Aprendiz', 'query') ? (
          <ModuloAprendiz accion={itemUrl} tipo={tipo} handleClick={handleBtnPrincipal} />
        ) : (
          <PermisoAlert opcion={verificarPermiso('Aprendiz', 'query')} />
        );

      case 'ModuloActas':
        return verificarPermiso('Aprendiz', 'query') ? (
          <ModuloActas accion={itemUrl} tipo={tipo} handleClick={handleBtnPrincipal} />
        ) : (
          <PermisoAlert opcion={verificarPermiso('Aprendiz', 'query')} />
        );

      case 'CambiarPassword':
        return <CambiarPassword accion={itemUrl} tipo={tipo} />;

      case 'ModuloReportes':
        return <ModuloReportes accion={itemUrl} tipo={tipo} />;

      default:
        return '';
    }
  };

  return <React.Fragment>{renderComponent()}</React.Fragment>;
};

ModulosPrincipales.defaultProps = {
  itemsmenu: '/',
};

export default ModulosPrincipales;
