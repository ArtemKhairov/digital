import {createContext, useEffect} from 'react';

export const AppContext = createContext({});

export const AppContextProvider = ({children}: any) => {
    useEffect(()=>{
        
    },[])
  return <AppContext.Provider>{children}</AppContext.Provider>;
};
