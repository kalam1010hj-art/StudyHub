import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";
function ProtectedRoute(){
let {token,isAuthenticated} = useContext(AuthContext)

if(!(token)){
   return  <Navigate  to="/login" replace />
}
    return (<Outlet/>)
    
} export default ProtectedRoute