import React, {createContext, useCallback, useState} from 'react';
import Swal from 'sweetalert2'
import { APICore } from '../../helpers/api/apiCore';
import encodeBasicUrl from '../../utils/encodeBasicUrl';
const api = new APICore();
const NotificacionesContext = createContext();
const NotificacionesProvider = ({ children }) => {
     const [loading, setLoading] = useState(true);
    const [itemsQueryById, setQueryByIdComite] = useState([]);
    const [idSolicitudComite, setIdSolicitud] = useState(0);
    const [idDirectivos, setIdDirectivos] = useState();
    const [status, setStatus] = useState('202');

    /*GETDATA PARA ENVIAR DATOS DEL PROMULARIO */
  const getData = useCallback((queryDatos) => {
    const infoUsers = sessionStorage.getItem('hyper_user');
    const infoUser =  JSON.parse(infoUsers)
    if(Number(infoUser[0]?.id>0)){
    const url = `${queryDatos}&entidad=${encodeBasicUrl(infoUser[0]?.entidad)}&idUsuario=${encodeBasicUrl(infoUser[0]?.id)}&Apikey=${encodeBasicUrl(infoUser[0]?.Apikey)}&ApiToken=${encodeBasicUrl(infoUser[0]?.ApiToken)}`;
    const respDatos = api.sendRequestData(url);
    respDatos
        ?.then(function (resp) {
           
          if(resp[0].status==='202' ){
            Swal.fire('' + resp[0].message + '');
            setStatus('202')
          }else{
            Swal.fire('' + resp[0].message + '');
            setStatus('404')
          }
           
            /**setEvents */
        })
        .catch((error) => console.error('Error:', error))
        .finally(() => {
            setTimeout(function () {
                setLoading(true);
            }, 1000);
        });
        }
}, []);

    /*QUERY PARA CONSULTAR DATOS */
const query = useCallback((itemUrl, tipo, opcion) => {
    setLoading(true);
    setTimeout(function () {
      let varibles;
      let datos = opcion;
      if (opcion) {
        var queryString = datos[0]
          ? Object.keys(datos[0])
            .map((key) => key + '=' + datos[0][key])
            .join('&')
          : '';
        varibles = queryString;
      }
      let userInfo = sessionStorage.getItem('hyper_user');
      const user = JSON.parse(userInfo);
      if (user) {
        const url = `accion=${encodeBasicUrl(itemUrl)}&tipo=${encodeBasicUrl(tipo)}&${varibles}&entidad=${encodeBasicUrl(user[0]?.entidad)}&idUsuario=${encodeBasicUrl(user[0]?.id)}`;
        const datosMaterial = api.sendRequestData(`${url}`);
        datosMaterial?.then(function (response) {
          
          try {
            {
              (() => {
                switch (datos[0]?.obj) {
                  case 'queryByIdComite':
                    setQueryByIdComite(response)
                    break
                    case 'query':
                        setQueryByIdComite(response)
                    break
                }
              })()
            }
          } catch (error) {
            console.error(error);
          }
        })
          .catch((error) => console.error('Error:', error))
          .finally(() => {
            setTimeout(function () {
              setLoading(false);
            }, 1000);
          });
      }
    }, 2000);
  }, []);


  function obtenerNumeroDesdeURL(url) {
    const match = url.match(/p=(\d+)/);
    if (match) {
      const numero = parseInt(match[1], 10); // Convertimos la coincidencia en un número
      return numero;
    } else {
      return null;
    }
  }
  function obtenerIdsVerdaderos(array1, array2) {
    const idsVerdaderos = [];
  
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] === true && array2[i] && array2[i].id) {
        idsVerdaderos.push(array2[i].id);
      }
    }
  
    if (idsVerdaderos.length > 0) {
      return idsVerdaderos.join(','); // Unir los "id" con comas
    } else {
      return ''; // Si no se encuentran "id" verdaderos, retornar una cadena vacía
    }
  }
  function objetoContieneElementosVacios(objeto) {
    for (const propiedad in objeto) {
      if (objeto.hasOwnProperty(propiedad)) {
        // Verificar si la propiedad está vacía (undefined, null o una cadena vacía)
        if (objeto[propiedad] === undefined || objeto[propiedad] === null || objeto[propiedad] === '') {
          return true; // Si una propiedad está vacía, el objeto contiene elementos vacíos
        }
      }
    }
    return false; // Si no se encontraron elementos vacíos, el objeto no contiene elementos vacíos
  }

const data = {
    getData,
    setQueryByIdComite,
    loading, setLoading,
    itemsQueryById,query,
    obtenerNumeroDesdeURL,
    idSolicitudComite, setIdSolicitud,
    idDirectivos, setIdDirectivos,
    obtenerIdsVerdaderos,
    objetoContieneElementosVacios,
    status
};


    return (
      <>
          <NotificacionesContext.Provider value={data}>{children}</NotificacionesContext.Provider>
      </>
  );
};
export { NotificacionesContext, NotificacionesProvider};
