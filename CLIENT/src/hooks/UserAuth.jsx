import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function UserAuth() {
    const {user} = useContext(UserContext);
        if(user){
            return <Outlet />;
        }else{
            return <Navigate to="/login"/>;
        }
}

export default UserAuth;