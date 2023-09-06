import React, {createContext, useState} from 'react';
const SearchContext = createContext();
const SearchProvider = ({ children }) => {
    const [itemsOptionAprendiz, setSelectedOptionAprendiz] = useState('none');

const data = {
    itemsOptionAprendiz,
    setSelectedOptionAprendiz
};

    return (
      <>
          <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
      </>
  );
};
export { SearchContext, SearchProvider};
