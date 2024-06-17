import React, {createContext,useContext,useState} from 'react';
import Swal from 'sweetalert2';
import { NotificacionesContext } from './NotificacionesProvider';
//import { SearchContext } from './SearchContext';

const DatosSolicitudContext = createContext();
const DatosSolicitudProvider = ({ children }) => {
  const { getData } = useContext(NotificacionesContext);
  const [itemsSolicitud, setItemsSolicitud] = useState([
    {
        idAprendiz: '',
        tipoComite: '',
        tipoAtencion: '',
        fechaIncidente: '',
        accion: 'ModuloEnviarComite',
        opcion: '',
        tipo: 'EnviarSolicitud',
        selectedFile: '',
        base64String: '',
        descripcion:'',
        nombrePrograma:'',
    },
]);
const handleSaveEvidencia = (e) => {
  console.log(e)
};
const updateSolicitud = (key, value,idSolicitud) => {
  const datosEvent = {
      idSolicitud: idSolicitud,
      opcionUpdate: key,
      e: value,
      accion: 'ModuloSolicitudComite',
      opcion: 'updateSolicitud',
      tipo: 'updateSolicitud',
  };

  Swal.fire({
      title: 'Desea actualizar este registro',
      showCancelButton: true,
  }).then((result) => {
      if (result.isConfirmed) {
          const queryDatos = Object.entries(datosEvent)
              .map(([key, value]) => {
                  const encodedValue = btoa(value);
                  return `${key}=${encodedValue}`;
              })
              .join('&');

          Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Enviando Solicitud...',
              showConfirmButton: false,
              timer: 1500
          });

          setTimeout(() => {
              getData(queryDatos);
          }, 2000);
      }
  });
};
const data = {
  itemsSolicitud, setItemsSolicitud,handleSaveEvidencia,updateSolicitud
};

    return (
      <>
          <DatosSolicitudContext.Provider value={data}>{children}</DatosSolicitudContext.Provider>
      </>
  );
};
export { DatosSolicitudContext, DatosSolicitudProvider};
