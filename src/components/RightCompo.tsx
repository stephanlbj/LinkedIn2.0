import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import {Followedusers} from "../Data/Utils"
import {BsInfoSquareFill,BsArrowRightShort} from "../Icon"

const RecommandedList : Followedusers[]=[
    {
        id:1,
        name:"Mary Jones",
        description:"Java Developer | Ruby on Rails | Js/NodeJs"
    },
    {
        id:2,
        name:"Henry Bot",
        description:"DevOps engineer"
    }
    ,
    {
        id:3,
        name:"Eric Gordon",
        description:"Full Stack Developper: Java/Spring | Dart/Flutter | Ruby on Rails | Js/NodeJs"
    }
]

const RightCompo = () => {
  return (
   <>
    <div className='bg-white rounded-md shadow-lg w-full lg:w-11/12 mx-auto '>

  <div className='p-3 '>
    <div className='flex items-center justify-between'>
    <h1 className='font-semibold'>Add to your feed</h1>
        <BsInfoSquareFill className='Icon'/>
    </div>

    
    <div className='mt-8 flex flex-col space-y-4 w-full'>
{
    RecommandedList.map((item)=>(
        <div className='flex space-x-2 ' key={item.id}>

<FaUserCircle className='h-10 w-10 text-gray-400 w-full'/>

<div className='flex flex-col space-y-2 flex-1'>

<h1 className='font-semibold'>{item.name}</h1>
<p className='text-gray-400 text-[13px]'>{item.description}</p>
<div >
<button className='w-fit border border-gray-400 rounded-full px-3 py-1' >+ Follow</button>
</div>
</div>


        </div>
    ))
}
    </div>
    <button className='flex items-center px-4 space-x-1 mt-4 cursor-pointer'>
        <h1>View all recommendations </h1>
        <BsArrowRightShort className='Icon h-6 w-6'/>
    </button>
 
    </div>      
  </div>

  <div className='top-24 sticky mb-4 flex justify-center mt-8 rounded-md'>
   <img
   src='/imgs/linkedin.png'
   width="300px"
   height="300px"
   style={{objectFit:"fill"}}
   />
  </div>
   </>
  )
}

export default RightCompo