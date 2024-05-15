import React,{useContext,useEffect} from 'react';


import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';
import { useAprendiz } from '../../../../../hooks/useAprendiz';



const FormUpdate = (props) => {

  const { itemUrl, tipo,itemsUsuarios,itemsUpdate } = useContext(DashboardContext);

  const {itemsAprendiz,query} = useAprendiz()

const datos = itemsAprendiz?.data || [];
const idAprendizABuscar = itemsUpdate > 0 ? itemsUpdate: 0;

const datosTask = datos?.filter((t) => t.idAprendiz === idAprendizABuscar);

useEffect(() => {
  query('ModuloAprendiz','aprendiz',[{opcion:btoa('listaAprendiz'),obj:'aprendiz'}]);
}, [query]);

  return (
  <React.Fragment>
       {datosTask[0]?.idAprendiz > 0 ?
      <Fields
        idAprendiz={idAprendizABuscar}
        accion={itemUrl}
        tipo={tipo}
        title={props.title}
        validated={props.validated}
        opcion={'update'}
        textBtn={'Actualizar Aprendiz'}
        roles={itemsUsuarios?.data?.roles}
        ItemsUpdate={[itemsUpdate]}
        objAprendiz={datosTask[0]}
        Idpermiso={itemsUpdate?.items?.Idpermiso}
      />
      : "Cargando Datos Aprendiz..."}
  </React.Fragment>
    );
}
export default FormUpdate;
