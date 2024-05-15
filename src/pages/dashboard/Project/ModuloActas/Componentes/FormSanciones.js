import React, { useContext,useEffect } from 'react';
import FieldSanciones from './FieldSanciones';
import { useAprendiz } from '../../../../../hooks/useAprendiz';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';

/* custon FormAdd */

const FormSanciones = (props) => {
    const { itemUrl, tipo, itemsUpdate } = useContext(DashboardContext);

    const { itemsAprendiz, query } = useAprendiz();

    const datos = itemsAprendiz?.data || [];
    const idAprendizABuscar = itemsUpdate > 0 ? itemsUpdate : 0;

    useEffect(() => {
        query('ModuloAprendiz', 'aprendiz', [{ opcion: btoa('listaSanciones'), obj: 'aprendiz', idAprendiz:btoa(idAprendizABuscar)}]);
    }, [query,idAprendizABuscar]);

    let userInfo = sessionStorage.getItem('hyper_user');
    const user = JSON.parse(userInfo);
    console.log(itemsAprendiz);
    return (

        <React.Fragment>
           {datos[0]?.idAprendiz > 0 ?
            <FieldSanciones
                accion={itemUrl}
                tipo={tipo}
                title={props.title}
                validated={props.validated}
                opcion={'editarSanciones'}
                textBtn={'Registrar Sanciones Aprendiz'}
                entidad={user[0]?.entidad}
                objAprendiz={datos[0]}
            />
            : "Cargando Sanciones Aprendiz..."}
        </React.Fragment>
    );
};
export default FormSanciones;
