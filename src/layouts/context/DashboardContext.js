
import React, { createContext, useState, useCallback,useEffect } from 'react';
import classNames from 'classnames';
import {Card } from 'react-bootstrap';
import Spinner from '../../components/Spinner';

const DashboardContext = createContext();
const DashboardProvider = ({ children }) => {

  const [tipo, setitemsMenuPrincipal] = useState('');
  const [itemUrl, setitemsUrl] = useState('');
  const [itemsQuery, setItemsQuery] = useState([]);
  const [isLoading, setLoading] = useState([]);
 
  
   //DESGLOSAR URL PARA CADA OPCION DEL MENU
  const itemsMenuCallBack = useCallback((e) => {

    const items_sub = e?.replace('/dashboard/', '').replace('/', '');
    if (items_sub) {
      let userInfo = JSON.parse(sessionStorage.getItem('ITEM_SELECT'))
      if (userInfo?.tipo.length === 0) {
        setitemsMenuPrincipal('Bienvenido');
        setitemsUrl('Inicio');
        setLoading(false)
      }else{

        setitemsMenuPrincipal(userInfo?.tipo.replace(/ /g, ""));
 
        setitemsUrl(userInfo?.menu);
        setLoading(false)
      }
    }
  }, []);

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

  const data = {
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
  };
  return (
    <>
      <DashboardContext.Provider value={data}>{children}</DashboardContext.Provider>
    </>
  );
};
export { DashboardContext, DashboardProvider };
