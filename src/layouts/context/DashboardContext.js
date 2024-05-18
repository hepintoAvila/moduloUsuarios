/* eslint-disable react-hooks/exhaustive-deps */

import React, { createContext, useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import {Card } from 'react-bootstrap';
import Spinner from '../../components/Spinner';
import encodeBasicUrl from '../../utils/encodeBasicUrl';
import ConfirmacionEliminacionStrategy from './ConfirmacionEliminacionStrategy';
import { useAprendiz } from '../../hooks/useAprendiz';
import Swal from 'sweetalert2';
import { APICore } from '../../helpers/api/apiCore';
const api = new APICore();
const DashboardContext = createContext();
const DashboardProvider = ({ children }) => {

  const [tipo, setitemsMenuPrincipal] = useState('/dashboard/');
  const [itemUrl, setitemsUrl] = useState('');
  const [itemsQuery, setItemsQuery] = useState([]);
  const [isLoading, setLoading] = useState([]);
  const [open, setOpen] = useState(false);
  const [signUpModalAdd, setSignUpModalAdd] = useState(false);
  const [itemsUpdate, setItemsUpdate] = useState(0);
  const [opcion, setOpcion] = useState('');
  const [opcionBusqueda, setOpcionBusqueda] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedItem, setIsCheckedItem] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [objAprendiz, setObjAprendiz] = useState([]);
  const [objActas, setObjActas] = useState({});
  const [objDatosAprendiz, setObjDatosAprendiz] = useState({});
  const [status, setStatus] = useState('202');
  const [itemsAsistentes, setItemsAsistentes] = useState([
    {
        nombresApellidos:'',
        documento:'',
        contratista:'',
        otroContratista:'',
        dependencia:'',
        email:'',
        telefono:'',
        autorizacion:'',
        firmaDigital:'',
        nombresDigital:'',


    },
]);
   //DESGLOSAR URL PARA CADA OPCION DEL MENU

  const itemsMenuCallBack = (e) => {
    let userInfo = JSON.parse(sessionStorage.getItem('ITEM_SELECT'))
    if (e===0) {
    if (userInfo?.tipo.length === 0) {
        setitemsMenuPrincipal('Bienvenido');
        setitemsUrl('Inicio');
        setLoading(false)
      }else{
        console.log('userInfo',userInfo);
        setitemsMenuPrincipal(userInfo?.tipo.replace(/ /g, ""));
         setitemsUrl(userInfo?.menu);
        setLoading(false)
      }
    }
  };

  const Spinners = () => {
    const sizes = ['sm'];
    return (
        <Card>
            <Card.Body>
                <div className="row">
                    {sizes.map((size, index) => {
                        return (
                            <div key={index} className="col-lg-6">
                                <Spinner className="text-primary m-2" color="primary" size={size} />
                            </div>
                        );
                    })}
                </div>
            </Card.Body>
        </Card>
    );
};
  const StatusColumn = ({ row }) => {
    return (
      <React.Fragment>
        <span
          className={classNames('badge', {
            'bg-success': row.original.status,
            'bg-danger': !row.original.status,
          })}>
          {row.original.status ? 'Active' : 'Deactivated'}
        </span>
      </React.Fragment>
    );
  };

  const sizePerPageList = [
    {
      text: '5',
      value: 5,
    },
    {
      text: '10',
      value: 10,
    },
    {
      text: '25',
      value: 25,
    },
  ];

const pagesInSearch = () => {
  const query = window.location.hash;
  //console.log('query',query)
  return query;
};
const AdvertenciaLocalStorage = () => {
  useEffect(() => {
    const seccionEnLocalStorage = sessionStorage.getItem('hyper_user');

    if (!seccionEnLocalStorage) {
      return window.location.hash = '#/account/logout';
    }
  }, []);


};
    //ELEIMINAR REGISTRO
    const eliminar = useCallback(
      (cel) => {
          let permiso = sessionStorage.getItem('PERMISO');
          const localPermiso = JSON.parse(permiso);
          if (localPermiso.delete) {
              const estrategiaConfirmacion = new ConfirmacionEliminacionStrategy();
              estrategiaConfirmacion.confirmar(cel, (cel) => {
                  const url = `accion=${btoa(itemUrl)}&tipo=${btoa(tipo)}&opcion=${btoa('delete')}'&id=${btoa(cel)}`;
                  const respuesta = api.sendRequestData(`${url}`);
                  respuesta
                      .then(function (resp) {
                          Swal.fire('' + resp[0].menssage + '');
                      })
                      .catch((error) => console.error('Error:', error))
                      .finally(() => {
                          setTimeout(function () {}, 5000);
                      });
              });
          } else {
              Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
          }
      },
      [itemUrl,tipo]
  );
const handleRegresar = (tipo) => {

  const menuitems = window.location.hash.split('#/')[1];
  const seccion = menuitems.replace(/^dashboard\//, '');
  const [seccion1] = seccion?.split('/');
  let url = '';
  (() => {
      // eslint-disable-next-line default-case
      switch (tipo) {
          case 'EnviarSolicitud':
              url = `/dashboard/${seccion1}/${tipo}`;
              break;
          case 'ConsultaIncidente':
          case 'ModuloSolicitudComite':
              url = `/dashboard/${seccion1}/${tipo}`;
              break;
          case 'ConsultaNotificaciones':
          case 'AgendarCitas':
              url = `/dashboard/${seccion1}/${tipo}`;
      }
  })();


  setitemsMenuPrincipal(seccion1);
  setitemsUrl(tipo);
  return window.location.hash=url;
}
const handleOnChange = (id,name,email) => {
  setIsChecked(!isChecked);
  setIsCheckedItem(id);

  const dataInLocalStorage = localStorage.getItem('idsIncidentes');
  const data = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : [];
  const itemExists = data?.filter((row) => {
    return row?.id === id;
    });



  if (!itemExists[0]?.id) {
    const newItem = { id,name,email };
    const updatedData = [...data, newItem];
    localStorage.setItem('idsIncidentes', JSON.stringify(updatedData));
  }else{
    const itemsDelete = data?.filter((row) => {
      return row?.id !== id;
      });
      localStorage.removeItem('idsIncidentes');
      localStorage.setItem('idsIncidentes', JSON.stringify(itemsDelete));
  }
};



    /*GETDATA PARA ENVIAR DATOS DEL PROMULARIO */
    const sendData = useCallback((queryDatos) => {
      const infoUsers = sessionStorage.getItem('hyper_user');
      const infoUser = JSON.parse(infoUsers);
      if (Number(infoUser[0]?.id > 0)) {
          const url = `${queryDatos}&entidad=${encodeBasicUrl(infoUser[0]?.entidad)}&idUsuario=${encodeBasicUrl(
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



const toggleItemSelection = (item) => {
  setSelectedItems(prevSelectedItems => {
    const newSelectedItems = prevSelectedItems.includes(item)
      ? prevSelectedItems.filter(i => i !== item)
      : [...prevSelectedItems, item];
      return newSelectedItems;
  });
};
useEffect(() => {
  if (selectedItems.length > 0) {

    /* OBTENER EL ID DEL ACTA*/
    const idUrl = pagesInSearch();
    let url = '#/dashboard/ModuloActas/Actas?p=';
    const id = idUrl?.replace(url, '');
    console.log('id',id)
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Registro Enviado',
      showConfirmButton: false,
      timer: 1500
    });

    const datosEvent = {
      idActa:btoa(id),
      items: btoa(selectedItems),
      accion: btoa('ModuloActas'),
      opcion: btoa('addIds'),
      tipo: btoa('actas'),
    };

    const queryDatos = Object.keys(datosEvent)
    .map((key) => {
      if (Array.isArray(datosEvent[key])) {
        return datosEvent[key]
          .map((item, index) => `${key}[${index}]=${encodeURIComponent(item)}`)
          .join('&');
      } else {
        return `${key}=${encodeURIComponent(datosEvent[key])}`;
      }
    })
    .join('&');
    sendData(queryDatos)
  }
}, [selectedItems]);


const {itemsAprendiz,query} = useAprendiz()
useEffect(() => {
  if(objAprendiz?.aprendiz?.length > 0){
 const partes = objAprendiz?.aprendiz.split('-');
 const datos = itemsAprendiz?.data || [];
 const datosTask = datos?.filter((t) => t.idAprendiz === partes[0]);

 const objDatosAprendiz ={
   id:datosTask[0]?.idAprendiz,
   nombres:datosTask[0]?.nombres,
   apellidos:datosTask[0]?.apellidos,
   correo:datosTask[0]?.correo,
   telefono:datosTask[0]?.telefono,
   identificacion:datosTask[0]?.identificacion,
   programaFormacion:datosTask[0]?.programaFormacion,
   proyectoFormativo:datosTask[0]?.proyectoFormativo,
   tipoIdentificacion:datosTask[0]?.tipoIdentificacion
 }
 setObjDatosAprendiz(objDatosAprendiz)
}


}, [objAprendiz]);
useEffect(() => {
  query('ModuloAprendiz','aprendiz',[{opcion:btoa('listaAprendiz'),obj:'aprendiz'}]);
}, [query]);



  const data = {
    sendData,
    status,
    setStatus,
    handleOnChange,
    toggleItemSelection,
    selectedItems,
    isChecked, setIsChecked,isCheckedItem,
    AdvertenciaLocalStorage,
    itemsMenuCallBack,
    setLoading,
    setitemsMenuPrincipal,
    isLoading,
    setitemsUrl,
    tipo,
    itemUrl,
    StatusColumn, sizePerPageList,
    itemsQuery, setItemsQuery,
    Spinners,
    pagesInSearch,
    open,
    setOpen,
    handleRegresar,
    signUpModalAdd,
    setSignUpModalAdd,
    itemsUpdate, setItemsUpdate,
    opcion, setOpcion,
    eliminar,
    opcionBusqueda,
    setOpcionBusqueda,
    objActas, setObjActas,setObjAprendiz,objDatosAprendiz,
    itemsAsistentes, setItemsAsistentes
  };
  return (
    <>
      <DashboardContext.Provider value={data}>{children}</DashboardContext.Provider>
    </>
  );
};
export { DashboardContext, DashboardProvider };
