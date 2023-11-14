
import React, { createContext, useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import {Card } from 'react-bootstrap';
import Spinner from '../../components/Spinner';
import ConfirmacionEliminacionStrategy from './ConfirmacionEliminacionStrategy';
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
  const [itemsUpdate, setItemsUpdate] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedItem, setIsCheckedItem] = useState(0);

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
  console.log('query',query)
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
                  const url = `accion=${itemUrl}&tipo=${tipo}&opcion=delete&id=${cel}`;
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
  {(() => {
      switch (tipo) {
      case 'EnviarSolicitud':
        url = `/dashboard/${seccion1}/${tipo}`;
      case 'ConsultaIncidente':
      case 'ModuloSolicitudComite':
      url = `/dashboard/${seccion1}/${tipo}`;
      case 'ConsultaNotificaciones':
      case 'AgendarCitas':
        url = `/dashboard/${seccion1}/${tipo}`;
      }
    })()
  }

  setitemsMenuPrincipal(seccion1);
  setitemsUrl(tipo);
  return window.location.hash=url;
}
const handleOnChange  = (id, opciones) => {
  setIsChecked(!isChecked);
  setIsCheckedItem(id);
 console.log('id,opciones',id,opciones)
}
  const data = {
    handleOnChange,
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
    eliminar
  };
  return (
    <>
      <DashboardContext.Provider value={data}>{children}</DashboardContext.Provider>
    </>
  );
};
export { DashboardContext, DashboardProvider };
