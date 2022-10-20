import { AiFillMessage, AiOutlineSearch, BsBriefcaseFill, FaBell, FaHome, MdGroup , FaUserCircle} from './Icon'
import {IconType} from "../node_modules/react-icons/lib/cjs/iconBase"


type MenuIcon ={
    id:number
    name:string
    icon:IconType
}
export const menuArray : MenuIcon[] =[
    {
        id:1,
        name:"Home",
        icon:FaHome
    },
    {
        id:2,
        name:"My Network",
        icon:MdGroup
    },
    {
        id:3,
        name:"Job",
        icon:BsBriefcaseFill
    },
    {
        id:4,
        name:"Messaging",
        icon:AiFillMessage
    },
    {
        id:5,
        name:"Notifications",
        icon:FaBell
    }
    ,
    {
        id:6,
        name:"Me",
        icon:FaUserCircle
    }
]