import {  useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "../../constats/baseUrl";

const AuthProvider : FC<PropsWithChildren> = ({children}) => {

      const [username, setUsername] = useState<string | null>( localStorage.getItem('username'))
      const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
      const [myOrders, setMyOrders] = useState([]);
 
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

         const getMyOrders = async() => {
         const response = await fetch(`${BASE_URL}/user/my-orders`, {
             method: "GET",
             headers:{
                Authorization: `Bearer ${token}`,
                 },
                 });
         if(!response.ok) return;
         const data = await response.json();
         setMyOrders(data);
      }


      return(
        <AuthContext.Provider value={{username, token, myOrders ,login, isAuthenticated, logout, getMyOrders}}>
            {children}
        </AuthContext.Provider>
      )

}

export default AuthProvider;