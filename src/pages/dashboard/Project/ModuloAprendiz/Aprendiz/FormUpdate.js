import React,{useContext} from 'react';


import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';
import { useAprendiz } from '../../../../../hooks/useAprendiz';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';


const FormUpdate = (props) => {

const { itemUrl, tipo,itemsUsuarios,itemsUpdate } = useContext(DashboardContext);
const {itemsAprendiz} = useAprendiz()
const datos = itemsAprendiz?.data || [];
const idAprendizABuscar = itemsUpdate > 0 ? itemsUpdate: 0;
const datosTask = datos?.filter((t) => t.idAprendiz === idAprendizABuscar);

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
      :<PermisoAlert />}
  </React.Fragment>
    );
}
export default FormUpdate;
