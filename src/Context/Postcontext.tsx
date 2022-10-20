import {createContext, useContext, useState} from "react"

type ContextProps = {
    children:React.ReactNode
}

type UserProfile ={

    email:string
    familyName:string
    givenName:string
    googleId:string
    imageUrl:string
    name:string
    
    }

type ContextValues = {
    IsPostFormActive:boolean
    setIsPostFormActive:React.Dispatch<React.SetStateAction<boolean>>
    IsUserSigned:boolean
    setIsUserSigned:React.Dispatch<React.SetStateAction<boolean>>
    UserInfo:UserProfile
    setUserInfo:React.Dispatch<React.SetStateAction<UserProfile>>
}


 

export const Mycontext = createContext({} as ContextValues)


export const ContextProvider = ({children}:ContextProps)=>{
    const [IsPostFormActive, setIsPostFormActive]= useState(false)
    const [IsUserSigned, setIsUserSigned]= useState(false)
    const [UserInfo, setUserInfo]= useState<UserProfile>({
        email:"",
        familyName:"",
        givenName:"",
        googleId:"",
        imageUrl:"",
        name:"",
    
    })


    return (
        <Mycontext.Provider value={{IsPostFormActive, setIsPostFormActive,
            IsUserSigned, setIsUserSigned,
            UserInfo, setUserInfo}}>
{children}
        </Mycontext.Provider>
    )
}

export const useMyContext = ()=> useContext(Mycontext)