import React, {createContext, useCallback, useState} from 'react';
import Swal from 'sweetalert2'
import { APICore } from '../../helpers/api/apiCore';
const api = new APICore();
const SearchContext = createContext();
const SearchProvider = ({ children }) => {
    const [itemsOptionAprendiz, setSelectedOptionAprendiz] = useState('none');
    const [itemsEnvioSolicitud, setSelectedEnvioSolicitud] = useState([]);
    const [itemsDescripcion, setDescripcion] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [validateError, setError] = useState({
        comiteError:false,
        llamadoError:false,
        aprendizError:false,
        fechaError:false,
        files:false,
        base64Strings:false,
        descripcionError:false,
        fechaPropuestaError:false,
    });
  const  descripcion=  itemsDescripcion?.descripcion;
  const  descripcionError=  itemsDescripcion?.valideDescripcion;

  const queryFile = useCallback((queryDatos, dataFile) => {
    const infoUsers = sessionStorage.getItem('hyper_user');
    const infoUser =  JSON.parse(infoUsers)
 
    if(Number(infoUser[0]?.id>0)){
    const url = `${queryDatos}&idUsuario=${btoa(infoUser[0]?.id)}&entidad=${btoa(infoUser[0]?.entidad)}&ApiToken=${btoa(infoUser[0]?.ApiToken)}&Apikey=${btoa(infoUser[0]?.Apikey)}`;
    const datosMaterial = api.sendFile(url, dataFile);
    datosMaterial
        ?.then(function (resp) {
            Swal.fire('' + resp[0].message + '');
        })
        .catch((error) => console.error('Error:', error))
        .finally(() => {
            setTimeout(function () {
                setLoading(true);
            }, 1000);
        });
        }
}, []);

const data = {
    itemsOptionAprendiz,
    setSelectedOptionAprendiz,
    itemsEnvioSolicitud,
    setSelectedEnvioSolicitud,
    setDescripcion,
    descripcion,
    descripcionError,
    validateError, setError,
    queryFile,
    loading,
    setLoading
};

    return (
      <>
          <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
      </>
  );
};
export { SearchContext, SearchProvider};
