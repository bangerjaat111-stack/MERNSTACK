import {useState,useContext,createContext} from 'react'
const AuthContext=createContext();

export function useAuth (){
    return useContext(AuthContext);
}

export function DataProvider ({children}){
    const [signin,setsignin]=useState(true);
    const value={signin,setsignin};
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}