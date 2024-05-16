import React, { useContext,useEffect } from 'react';
import FieldSanciones from './FieldSanciones';
import { useActas } from '../../../../../hooks/useActas';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';

/* custon FormAdd */

const FormSanciones = (props) => {
    const { itemUrl, tipo, itemsUpdate } = useContext(DashboardContext);

    const { itemsActas, query } = useActas();

    const datos = itemsActas?.data || [];
    const idActaBuscar = itemsUpdate > 0 ? itemsUpdate : 0;

    useEffect(() => {
      query('ModuloActas', 'actas', [{ opcion: btoa('listActas'), obj: 'actas',idActa: btoa(idActaBuscar)}]);
    }, [query,idActaBuscar]);

    let userInfo = sessionStorage.getItem('hyper_user');
    const user = JSON.parse(userInfo);

    return (

        <React.Fragment>
           {datos[0]?.idActa> 0 ?
            <FieldSanciones
                accion={itemUrl}
                tipo={tipo}
                title={props.title}
                validated={props.validated}
                opcion={'editarSanciones'}
                textBtn={'Registrar solicitudes Comite'}
                entidad={user[0]?.entidad}
                objAprendiz={datos[0]}
            />
            : "Cargando solicitudes del comite..."}
        </React.Fragment>
    );
};
export default FormSanciones;
