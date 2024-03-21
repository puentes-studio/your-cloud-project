import { createContext, useEffect, useState } from "react"

export const AutenticacionContext = createContext();

export const AutenticacionProviderComponent = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState((localStorage.getItem("user")));
    const [folderName, setFolderName] = useState((localStorage.getItem("folder_name")));

    useEffect(() => {

        localStorage.setItem("token", token);
        localStorage.setItem("user", user); // user_name
        localStorage.setItem("folder_name", folderName);
    

    }, [token, user, folderName]);


    const logout = () => {
        setToken("");
        setUser(null);
        setFolderName("");
    };



    return <AutenticacionContext.Provider value={{token, setToken, user, setUser, folderName, setFolderName, logout}}>
        {children}
        </AutenticacionContext.Provider>;
};