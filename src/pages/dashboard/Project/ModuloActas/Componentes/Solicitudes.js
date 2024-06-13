/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext,useEffect } from 'react';
import FieldSolicitudes from './FieldSolicitudes';
import { useActas } from '../../../../../hooks/useActas';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';

/* custon FormAdd */

const Solicitudes = (props) => {
    const { itemUrl, tipo, itemsUpdate } = useContext(DashboardContext);
    const { itemsActas, query } = useActas();
    const datos = itemsActas?.data || [];
    const idActaBuscar = itemsUpdate > 0 ? itemsUpdate : 0;

    let userInfo = sessionStorage.getItem('hyper_user');
    const user = JSON.parse(userInfo);

    useEffect(() => {

      query('ModuloActas', 'actas', [{ opcion: btoa('listActas'), obj: 'actas',id: idActaBuscar}]);
    }, [query,idActaBuscar]);

    return (

        <React.Fragment>
           {datos[0]?.idActa> 0 ?
            <FieldSolicitudes
                opcionBusqueda={props.opcionBusqueda}
                accion={itemUrl}
                tipo={tipo}
                title={props.title}
                validated={props.validated}
                opcion={'editarSanciones'}
                textBtn={'Registrar solicitudes Comite'}
                entidad={user[0]?.entidad}
                objAprendiz={datos[0]}
                idActa={idActaBuscar}
            />
            : <PermisoAlert/>}
        </React.Fragment>
    );
};
export default Solicitudes;
