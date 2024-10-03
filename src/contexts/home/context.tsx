import React from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import {  IHomeProviderProps, IHomeContextType } from "./interfaces/home";

const HomeContext = React.createContext<IHomeContextType|null>(null);

const HomeProvider:React.FC<IHomeProviderProps> = ({ children })=>{
    const {
        saveItem, 
      } = useLocalStorage('userRole',[], true);

      const navigate = useNavigate(); 
      
      const handleNavigate = (path: string, role:Array<string>) => {
        saveItem(role);
        navigate(path);
      };
      

    return(
        <HomeContext.Provider value={{
            handleNavigate
        }}
        >
            {children}
        </HomeContext.Provider>
    );
}
const useHomeContext = () => {
    const context = React.useContext(HomeContext);
    if (!context) {
        throw new Error('useHomeContext must be used within a HomeProvider');
    }
    return context;
};
export { HomeContext, HomeProvider, useHomeContext }