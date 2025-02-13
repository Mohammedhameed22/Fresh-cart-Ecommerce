import { createContext, useEffect, useState } from "react";




 export let UserContext=createContext();
export default function UserContextProvider({children}){
    const [userToken, setuserToken] = useState(null)


    useEffect(()=>{
        if (localStorage.getItem('usertoken')) {
            setuserToken(localStorage.getItem('usertoken'))
            
        }
    },[])
    return <UserContext.Provider value={{userToken,setuserToken}}>
        {children}
    
    </UserContext.Provider>

}