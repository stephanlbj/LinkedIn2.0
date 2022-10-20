import React, { useState } from 'react'
import Icon from './Icon'
import Inputfield from './Inputfield'
import Logo from './Logo'
import {menuArray} from "../MenuItem"
import {AiOutlineSearch,BsThreeDots} from '../Icon'
import { useMyContext } from '../Context/Postcontext'
import {Link, BrowserRouter as Router,} from "react-router-dom"
import {FaHome, MdGroup, BsBriefcaseFill, AiFillMessage, FaBell, FaUserCircle} from "../Icon"
import { GoogleLogout} from 'react-google-login';


type InputType = {
  Val:string
  SetVal:React.Dispatch<React.SetStateAction<string>>
}

const Search = ({Val, SetVal}:InputType) =>(
  
  
<input value={Val} 
onChange={(e)=>SetVal(e.target.value)}
placeholder="Search..."
className='bg-transparent outline-none'/>
 
)


 

const Header = () => {


 
   
    const {UserInfo,LocalStorageData,setLocalStorageData} = useMyContext()
    const [SearchInput, setSearchInput ] = useState("")
   
    const user_name = UserInfo.name.split(" ")
 
    const Logout = () =>{
      if(typeof window !== "undefined")
       window.localStorage.removeItem("userinfo")

       setLocalStorageData(null)
    }

   

  return (
        <div className='w-full  top-0 sticky z-30 '>
        
        {/*main div*/}
        <div className='w-full flex items-center space-x-1 bg-white'>
        {/*First Div*/}
       <div className='border-b px-3 py-2  border-gray-200 shadow-lg flex items-center
        md:justify-between flex-1'>

        {/*First  inner Div*/}
        <div className='flex items-center space-x-2 '>
        <Logo/>
        <div className='hidden lg:flex flex items-center space-x-2 
         py-2 bg-[#EEF5FD] shadow-lg px-2 rounded-full border border-gray-200 '>
        
       <AiOutlineSearch className='Icon'/>
       <Search Val={SearchInput} SetVal={setSearchInput}/>
       </div>
       </div>

       {/*menu*/}

   {
       LocalStorageData ? (
       <div className='flex items-center space-x-3 justify-around 
       flex-1 md:flex-none '>
      <Icon Icon={FaHome} name="Home"/>
      <Icon Icon={MdGroup} name="My Network"/>
      <Icon Icon={BsBriefcaseFill} name="Job"/>
      <Icon Icon={AiFillMessage} name="Messaging"/>
      <Icon Icon={FaBell} name="Notifications"/>
      <div onClick={()=>Logout()} className=' flex items-center justify-center flex-col space-y-2 cursor-pointer'>
      <img src={UserInfo.imageUrl} height="25px" width="25px" className='rounded-full'/>
      <h1 className='hidden md:block'>{user_name[0]}</h1>
      </div>
      </div>
      ):
      (
     <div className='flex items-center space-x-5'>

     <h1 className='cursor-pointer'>Join now</h1>

     <Link to="/signup">
     <h1 className='cursor-pointer border border-[#067D11] rounded-full px-3 py-1'>Sign in</h1>
     </Link>
     </div>
      )
      }
    
    </div>

     </div>
      
    
    </div>
  )
}

export default Header