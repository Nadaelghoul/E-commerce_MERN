import {  useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider : FC<PropsWithChildren> = ({children}) => {

      const [username, setUsername] = useState<string | null>( localStorage.getItem('username'))
      const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

      const isAuthenticated = !!token; // get the boolean value if token has value or not

      const login = (username: string, token: string) => {
         setUsername(username);
         setToken(token);
         localStorage.setItem('username', username); // localstorage built in react to save data when user make refresh data keeping save(taking key and value)
         localStorage.setItem('token', token);
      }
      
      const logout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        setUsername(null);
        setToken(null);
      }


      return(
        <AuthContext.Provider value={{username, token, login, isAuthenticated, logout}}>
            {children}
        </AuthContext.Provider>
      )

}

export default AuthProvider;