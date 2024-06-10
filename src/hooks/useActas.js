/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */
import { useCallback, useState } from 'react'
import encodeBasicUrl from '../utils/encodeBasicUrl';
import { APICore } from '../helpers/api/apiCore';
import Swal from 'sweetalert2';
const api = new APICore();

export const useActas = () => {
  const [isLoading, setLoading] = useState(false);
  const [itemsActas, setActas] = useState([]);
  const [itemsConceptos, setActasConceptos] = useState([]);
  const [itemsConsolidads, setConsolidado] = useState([]);
  const [status, setStatus] = useState('202');
  //QUERY DE RESPUSTA DE CONSULTAS
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
        const datosResq = api.sendRequestData(`${url}`);
        datosResq?.then(function (response) {
          try {
            {
              (() => {
                switch (datos[0]?.obj) {
                  case 'listarConceptos':
                    setActasConceptos(response)
                    break;
                  case 'actas':
                  case 'listActasInactivas':
                  case 'updateInactivas':
                    setActas(response)
                    break;
                    case 'generarConsolidado':
                    setConsolidado(response)
                    break;
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
      /*GETDATA PARA ENVIAR DATOS DEL PROMULARIO */
      const getDataConceptos = useCallback((queryDatos,queryDatos2) => {
        const infoUsers = sessionStorage.getItem('hyper_user');
        const infoUser = JSON.parse(infoUsers);
        if (Number(infoUser[0]?.id > 0)) {
            console.log('hyper_user',queryDatos)
            const url = `${queryDatos}&${queryDatos2}&entidad=${encodeBasicUrl(infoUser[0]?.entidad)}&idUsuario=${encodeBasicUrl(
                infoUser[0]?.id
            )}&Apikey=${encodeBasicUrl(infoUser[0]?.Apikey)}&ApiToken=${encodeBasicUrl(infoUser[0]?.ApiToken)}`;
            const respDatos = api.sendRequestData(url);
            respDatos
                ?.then(function (resp) {
                    if (resp[0].status === '202') {
                        Swal.fire('' + resp[0].message + '');
                        setStatus('202');
                    } else {
                        Swal.fire('' + resp[0].message + '');
                        setStatus('404');
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
  return (
    {
      status,
      query,
      isLoading,
      itemsActas,
      itemsConceptos,
      getDataConceptos,
      itemsConsolidads
    }
  )
}

