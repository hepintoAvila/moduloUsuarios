/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';

import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';
import { useActas } from '../../../../../hooks/useActas';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';

const FormUpdate = (props) => {
    const [localState, setLocalState] = useState([]);
    const { itemUrl, tipo, itemsUsuarios, itemsUpdate } = useContext(DashboardContext);

    const { itemsActas, query } = useActas();
    const idActaABuscar = itemsUpdate > 0 ? itemsUpdate : 0;
    useEffect(() => {
        query('ModuloActas', 'actas', [{ opcion: btoa('listActas'), obj: 'actas' }]);
    }, []);

    useEffect(() => {

      const intervalId = setInterval(() => {
        const datos = itemsActas?.data || [];
        const datosTask = datos?.filter((t) => t.idActa === idActaABuscar);
        setLocalState(datosTask);
      }, 1000);
      return () => {
        clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
      };
  }, [itemsActas]);

    return (
        <React.Fragment>
            {localState?.length>0 ? (
                <Fields
                    idActa={idActaABuscar}
                    accion={itemUrl}
                    tipo={tipo}
                    title={props.title}
                    validated={props.validated}
                    opcion={'update'}
                    textBtn={'Actualizar Acta'}
                    roles={itemsUsuarios?.data?.roles}
                    ItemsUpdate={[itemsUpdate]}
                    objActa={localState[0]}
                    Idpermiso={itemsUpdate?.items?.Idpermiso}
                />
            ) : (
                <PermisoAlert />
            )}
        </React.Fragment>
    );
};
export default FormUpdate;
