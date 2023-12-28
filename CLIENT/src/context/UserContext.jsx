/* eslint-disable react/prop-types */
import { createContext, useEffect, useMemo, useState } from "react";
import userInstance from "../api/userInstance";

 export const UserContext = createContext({});

 export function UserContextProvider({children}){
    const [user,setUser] = useState(null);

    useEffect(()=>{
        async function fetchUser(){
            try {
                const {data} = await userInstance.get("/auth-user");
                if(data?.success){
                    localStorage.setItem("userToken", data.token);
                    setUser(data.userData);
                }else{
                    localStorage.removeItem("userToken");
                    setUser(null);
                }
            } catch (error) {
                console.error(error);
            }
        }
        if(!user){
            fetchUser();
        }
    },[user]);
    const userMemo = useMemo(()=>({user,setUser}),[user,setUser]);
    return (
        <UserContext.Provider value={userMemo}>
            {children}
        </UserContext.Provider>
    );
 }