import React, {useRef,useState} from 'react'
import { useMyContext } from '../Context/Postcontext'

type Props = {
    Value:string
    InputFunc:React.Dispatch<React.SetStateAction<string>>
    placeHolder:string
    IsPostActive?:boolean
}
const Inputfield = ({Value,InputFunc,placeHolder,IsPostActive}:Props) => {

  const InputRef = useRef<HTMLInputElement>(null)
  const {IsPostFormActive, setIsPostFormActive} = useMyContext()
  const [focus, setfocus]= useState(false)
  const GiveFocus = ()=>{
   
    setfocus(true)
    setIsPostFormActive(!IsPostFormActive)
  }

   
  return (
   
        <input
        ref={InputRef}
        onFocus={GiveFocus}
        value={Value}
        onChange={(e)=>InputFunc(e.target.value)}
        placeholder={placeHolder}
        className={`bg-transparent outline-none w-full`}
        />
  
  )
}

export default Inputfield