import React, {createContext, useState} from 'react';
const SearchContext = createContext();
const SearchProvider = ({ children }) => {
    const [itemsOptionAprendiz, setSelectedOptionAprendiz] = useState('none');
    const [itemsEnvioSolicitud, setSelectedEnvioSolicitud] = useState([]);
    const [itemsDescripcion, setDescripcion] = useState([]);
    const [validateError, setError] = useState({
        comiteError:false,
        llamadoError:false,
        aprendizError:false,
        fechaError:false,
        files:false,
        base64Strings:false,
        descripcionError:false
    });
  const  descripcion=  itemsDescripcion?.descripcion;
  const  descripcionError=  itemsDescripcion?.valideDescripcion;
  
const data = {
    itemsOptionAprendiz,
    setSelectedOptionAprendiz,
    itemsEnvioSolicitud,
    setSelectedEnvioSolicitud,
    setDescripcion,
    descripcion,
    descripcionError,
    validateError, setError
};

    return (
      <>
          <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
      </>
  );
};
export { SearchContext, SearchProvider};
