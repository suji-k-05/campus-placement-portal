import React, { useContext, useState } from 'react'

const Authcontext=React.createContext()
export function AuthProvider(props) {
    const[user,setUser]=useState(null)
    function login(userData){
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData));
    }

    function logout(){
        setUser(null)
    }

    return(
        <Authcontext.Provider value={{user,login,logout}}>
            {props.children}
        </Authcontext.Provider>
    )
    
}

export function useAuth(){
    return useContext(Authcontext)
}
