"use client"

import { redirect, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const getUserFromLocalStorage = () => {
        if(typeof window !== 'undefined'){
            const profile = JSON.parse(localStorage.getItem('profile'));
            if(profile && profile.token && profile.user){
                // const token = profile.token;
                // const decodedToken = jwtDecode(token);
                // if(decodedToken.exp * 1000 > new Date().getTime()){
                    return profile.user;
                // }
            }
        }
        return null;
    }

    const router = useRouter();

    const [user, setUser] = useState(getUserFromLocalStorage);
    useEffect(()=>{
        if(!user){
            let tmpUser = getUserFromLocalStorage();
            if(tmpUser)
                setUser(tmpUser);
            // else    
            //     router.replace('/');
        }
    }, [user])

    const login = (profile) => {
        rewriteProfile(profile)
        router.push('/')
    }
    const logout = () =>{
        setUser(null);
        localStorage.removeItem("profile");
        router.push('/')
    }
    const rewriteProfile = (profile) => {
        const tmpUser = profile.user;
        tmpUser.role = profile.userRole;
        setUser(profile.user);
        localStorage.setItem("profile", JSON.stringify({...profile}));
    }

    return (
        <UserContext.Provider value={{user, login, logout, rewriteProfile}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;

export const useUserContext = () => useContext(UserContext);