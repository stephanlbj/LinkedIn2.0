import React from 'react'
import {FaUserCircle, AiOutlineUserAdd} from "../Icon"
import {IconType} from "../../node_modules/react-icons/lib/cjs/iconBase"
import { ListProps } from '../Data/Utils'
import { useMyContext } from '../Context/Postcontext'


 
const SideList: ListProps[]=[
{
id:1,
name:"Groups"
},
{
id:2,
 name:"Events"
},
{
id:3,
 name:"Followed Hashtags"
},

]

const Sidecompo = () => {

    const {UserInfo} = useMyContext()
    


  return (
    <>
    <div className='bg-white rounded-md shadow-lg w-full lg:w-9/12 mx-auto'>

<div className='flex flex-col items-center justify-center space-y-3 py-4'>
<img
src={UserInfo.imageUrl}
height="50px"
width="50px"
className='rounded-full'
/>
   
<div className='py-2 border-b border-gray-200  w-full'>
<h1 className='font-semibold text-center'>{UserInfo.name}</h1>
<h1 className='text-[12px] text-center'>Software Developer</h1>
</div>

<div className='py-2 border-b border-gray-200 px-3 w-full flex items-center justify-between'>

<div className=''>
<h1 className=' text-[12px] '>Connections</h1>
<h1 className='font-semibold text-[12px] '>Grow your network</h1>
</div>

    <AiOutlineUserAdd className='Icon text-black'/>
</div>

<div className='py-2 border-b border-gray-200  w-full'>
<h1 className='text-center text-[12px] px-2'>Access exclusive tools & insights</h1>
<h1 className='text-[13px] text-center underline font-semibold'>Get Hired Faster, Try.</h1>
<h1 className='text-[13px] text-center underline font-semibold'>Premium Free</h1>
</div>

<div className=' w-full flex items-center justify-center '>
    <h1 className='text-[12px] text-gray-800 font-semibold'>My items</h1>
</div>

</div>
        


        </div>

        <div className='my-8 bg-white rounded-md shadow-lg top-40 sticky lg:w-9/12 mx-auto'>
            <div className='px-2 py-3'>
                {
                    SideList.map(item=>(
                        <h1 key={item.id} className='text-blue-500 font-semibold text-[12px] py-1'>{item.name}</h1>
                    ))
                }
            </div>
            <div className='border-t  border-gray-200'>
                <h1 className='text-center text-[13px] text-gray-500 font-semibold py-2'>Discover more</h1>
            </div>
        </div>
    </>
    
  )
}

export default Sidecompo