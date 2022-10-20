import React , {useState}from 'react'
import {FaUserCircle} from "../Icon"
import Inputfield from './Inputfield'
import {ButtonInputList} from "../Data/Utils"
import { MdPhotoLibrary , MdVideoLibrary, MdArticle, BsCalendarEventFill} from "../Icon"
import { useMyContext } from '../Context/Postcontext'

type BtnStyle = ButtonInputList  & {
color:string
}

const ButtonList : BtnStyle[]=[
    {
    id:1,
    name:"Photo",
    icon:MdPhotoLibrary,
    color:"text-blue-500"
},
{
    id:2,
    name:"Video",
    icon:MdVideoLibrary,
    color:"text-green-700"
    
},
{
    id:3,
    name:"Event",
    icon:BsCalendarEventFill,
    color:"text-orange-500"
},
{
    id:4,
    name:"Write article",
    icon:MdArticle,
    color:"text-orange-800"
},
]

const SendInput = () => {
   const {IsPostFormActive, setIsPostFormActive, UserInfo} = useMyContext()
    const [Post,setPost] = useState("")
 


     return (
    <div className='bg-white rounded-md shadow-lg w-full '>
     <div className='p-3 flex flex-col items-center
     justify-center space-y-4 '>

{/*Input field*/}
<div className='flex items-center justify-between space-x-3 w-full'>
<img
src={UserInfo.imageUrl}
height="40px"
width="40px"
className='rounded-full'
/>
 
<div className='flex-1 border border-gray-200 py-3 px-2 rounded-full'>
<Inputfield InputFunc={setPost} Value={Post} placeHolder="Start a post" IsPostActive={IsPostFormActive}/>
</div>
</div>

{/*Button Lists*/}

<div className='flex items-center justify-around space-x-3 w-full'>
{
    ButtonList.map((item)=>(
        <div key={item.id} className='flex items-center space-x-2 cursor-pointer'>
            <item.icon className={`${item.color}`}/>
            <h1>{item.name}</h1>
        </div>
    ))
}
</div>
     </div>

    </div>
  )
}

export default SendInput