/* eslint-disable react-hooks/exhaustive-deps */
// @flow
 
import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';
import MenuPrincipal from '../GestionMenu/MenuPrincipal/MenuPrincipal';

const GestionMenu = (props) => {
  const permisos = props?.permisos || {};
  return (
    <>
      {(() => {
        switch (props?.tipo) {
          case 'Menus':
            return <>
              {permisos?.query?.length === 1 ?
                (<MenuPrincipal
                  accion={'MenuPrincipal'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> ): <PermisoAlert menssage={'Usted no tiene permiso de consulta'}/>}
            </>
          default:
            return (
              <>{''}</>
            );
        }
      })()}
    </>
  );
};

export default GestionMenu;
