import React, { useState } from 'react'
import {IconType} from "../../node_modules/react-icons/lib/cjs/iconBase"
import { menuArray } from '../MenuItem'



type Prosp = {
   Icon:IconType
   name:string
   id?:number
}
const Icon = ({Icon, name} : Prosp) => {

    const [Update, setUpdate] = useState("")

    const ClickedBtn = (ID:string) =>{
        setUpdate(ID)
    }

      


  return (


   <div key={name} onClick={()=>ClickedBtn(name)}
   className={`flex items-center justify-center flex-col space-y-2 cursor-pointer`}>
   <Icon className={` Icon h-6 w-6`}/>
   <p className={`  text-[13px] hidden md:block`}>{name}</p>
  </div>
    )
}

export default Icon