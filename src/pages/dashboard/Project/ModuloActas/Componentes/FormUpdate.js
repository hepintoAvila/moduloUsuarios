import React,{useContext,useEffect} from 'react';


import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';
import { useActas } from '../../../../../hooks/useActas';



const FormUpdate = (props) => {

  const { itemUrl, tipo,itemsUsuarios,itemsUpdate } = useContext(DashboardContext);

  const {itemsActas,query} = useActas()

const datos = itemsActas?.data || [];
const idActaABuscar = itemsUpdate > 0 ? itemsUpdate: 0;

const datosTask = datos?.filter((t) => t.idActa === idActaABuscar);

useEffect(() => {
  query('ModuloActas', 'actas', [{ opcion: btoa('listActas'), obj: 'actas' }]);
}, [query]);
console.log('idActaABuscar',idActaABuscar)
  return (
  <React.Fragment>
       {datosTask[0]?.idActa > 0 ?
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
        objActa={datosTask[0]}
        Idpermiso={itemsUpdate?.items?.Idpermiso}
      />
      : "Cargando Datos del Acta..."}
  </React.Fragment>
    );
}
export default FormUpdate;
