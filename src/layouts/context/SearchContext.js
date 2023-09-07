import React, {createContext, useState} from 'react';
const SearchContext = createContext();
const SearchProvider = ({ children }) => {
    const [itemsOptionAprendiz, setSelectedOptionAprendiz] = useState('none');
    const [itemsEnvioSolicitud, setSelectedEnvioSolicitud] = useState([]);
    const [itemsDescripcion, setDescripcion] = useState([]);
 
    
const data = {
    itemsOptionAprendiz,
    setSelectedOptionAprendiz,
    itemsEnvioSolicitud,
    setSelectedEnvioSolicitud,
    setDescripcion,
    itemsDescripcion
};

    return (
      <>
          <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
      </>
  );
};
export { SearchContext, SearchProvider};
