import React, {useEffect, useState} from 'react'
import {BsThreeDots, FaUserCircle,
  AiOutlineLike, AiFillHeart, AiOutlineDislike,
  BiCommentDetail, FiSend, BiRepost} from "../Icon"
import {IconType} from "../../node_modules/react-icons/lib/cjs/iconBase"
import Moment from 'react-moment';
import { arrayRemove, arrayUnion, collection, doc, getDoc, onSnapshot, QuerySnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { useMyContext } from '../Context/Postcontext';
import toast from 'react-hot-toast';
import {SinglePostProps,LikeType} from "../MyTypes"


import uuid from 'react-uuid';


type Props ={
  Icon:IconType
  name:string
}

 

const BtnFeed =  ({Icon, name}:Props) =>(
  <div className='flex items-center space-x-2 cursor-pointer'>
<Icon className='text-gray-500 h-5 w-5'/>
<h1 className='text-gray-500 hidden md:block'>{name}</h1>
  </div>
)
 

 
const Feed = ({ProPic,UserName,id,text,time,Img, likes, comments}:SinglePostProps) => {

  const {UserInfo} = useMyContext()
  const [IsClicked,setIsClicked] = useState(false)
  const [Comment,setComment] = useState("")
  const [CommentID,setCommentID] = useState("")
  const [ShowLastComments,setShowLastComments] =useState("")
  const [ShowText,setShowText] =useState("")


  const ShowComment = (ID:string)=>{
    if(ShowLastComments !== id){
      setShowLastComments(ID)
    }
    else{
      setShowLastComments("")
    }
   
  }

const ShowAll =  (ID:string)=>{
  if(ShowText !== id){
    setShowText(ID)
  }
  else{
    setShowText("")
  }
}

const SENDComment = async (e:React.FormEvent,ID:string)=>{
e.preventDefault()

const PostRef = doc(db, "Posts", ID);

try {
 
await updateDoc(PostRef, {
    comments: arrayUnion({
      email:UserInfo.email,
      text:Comment,
      id:id,
      User:UserInfo.name,
      pic:UserInfo.imageUrl
    
    })
}).then(()=>{
  toast.success("Comment sent!!")
  setComment("")
 }).catch((err)=>{
  toast.error("Sorry, an error!!", err.message)
 })
} catch (error) {
  toast.error("Sorry, an error!!")
}
}

 const CommentPost = (ID:string) =>{
  if(CommentID !== id){
    setCommentID(ID)
  }
  else{
    setCommentID("")
  }

 }

 
const LikePost =  async (ID:string) =>{

      const docRef = doc(db, "Posts", ID);
      const docSnap = await getDoc(docRef);
      
      if(docSnap.exists()){
        if(Array.isArray(docSnap.data().likes)){
          const user = docSnap.data().likes?.filter((like:LikeType)=>like.email === UserInfo.email)
          if(user?.length > 0){
            updateDoc(docRef, {
              likes:arrayRemove({
                 email:UserInfo.email,
              })
          })
          .then(()=>{
            toast.success("Post unliked!!")
           }).catch((err)=>{
            toast.error("Sorry, an error!!")
           })
          }else  if(user?.length == 0){
            updateDoc(docRef, {
              likes:arrayUnion({
                 email:UserInfo.email,
              })
          })
          .then(()=>{
            toast.success("Post liked!!")
           }).catch((err)=>{
            toast.error("Sorry, an error!!")
           })
          }
        }
      }

}

 
  return (
    <div key={id} className='bg-white my-6 border border-gray-200 rounded-md 
    shadow-lg '>
      
      <div className='flex flex-col h-wit '>

         {/*top part img, name and dots*/}

        <div className='flex  justify-between'>

<div className='flex  space-x-2 p-2'>
 
 {/*img profile*/}
 <div className='rounded-full'>
 <img src={ProPic} height="40px" width="40px" className='rounded-full' />
 </div>

{/*name and time*/}
<div className='flex flex-col space-y-3'>
<div className='flex flex-col space-y-3'>
<h1 className='font-semibold'>{UserName}</h1>
{
  time !== null &&  <Moment fromNow>{time.toDate()}</Moment>
}
</div>
</div>

 
</div>

<BsThreeDots className='h-6 w-6 mr-4 text-gray-400 mt-4'/>

        </div>


  {
    text &&  <div className='mx-12 my-3'>
      <p className='text-[14px] text-gray-600 '>{text}</p>
      </div>
  }

{
  Img && <img
  src={Img}
  height="400px"
   
   
  className='w-full my-4'
  />
}

        <div className='flex items-center justify-between px-4'>
          {
            likes.length > 0  && <div className='flex items-center space-x-2 '>
            <AiFillHeart className='text-red-500'/>
            <h1 className='text-[12px]'>{likes.length}</h1>
            </div>
          
          }


<div className='flex items-center space-x-3'>
  {
    comments?.length > 0 && 
    <h1 onClick={()=>ShowComment(id)} className='text-[12px] cursor-pointer hover:text-[#067D11]'>
      {comments?.length > 1 ? comments?.length + "  "+"Comments"   : comments?.length + "  "+ "Comment"} </h1>
  }

<h1 className='text-[12px]'>5 Reposts</h1>
</div>
        </div>
   
<div className='px-4 py-2 border-t-2 border-gray-200 flex items-center justify-around'>
<div onClick={()=>LikePost(id)}>

  {
    likes.filter((item)=>item.email === UserInfo.email).length > 0 ? 
    
    <BtnFeed Icon={AiOutlineDislike} name="Unlike" />
  
    : (
      <BtnFeed Icon={AiOutlineLike} name="Like" />
    )
  }


</div>
<div onClick={()=>CommentPost(id)}>
<BtnFeed Icon={BiCommentDetail} name="Comment"/>
</div>
<div>
<BtnFeed Icon={BiRepost} name="Repost"/>
</div>
<div>
<BtnFeed Icon={FiSend} name="Send"/>
</div>



</div>

      </div>

{
  CommentID === id && (
    <form onSubmit={(e)=>SENDComment(e, id)}>
        <div className='flex items-center space-x-3 justify-between mx-3 my-3  '>
           <div className='rounded-full'>
             <img src={ProPic} height="40px" width="40px" className='rounded-full'/>
          </div>
    <input
    value={Comment}
    onChange={(e)=>setComment(e.target.value)}
    placeholder="Comment..."
    className='w-full p-2 border border-gray-300 rounded-full outline-none '
  />
      <button type='submit'
      disabled={Comment===""?true:false}
      className={` ${Comment !== "" ? "bg-[#067D11]  text-white"
      :"bg-gray-300 text-gray-500"} 
      px-3 py-1 rounded-full`}>
      Send
      </button>
     </div>

</form>
  )
}

<div className='p-2 w-full'>
{
  ShowLastComments !== "" && (
    comments.filter((comment)=>comment.id=== id)
    .slice(-2).reverse().map((item,ind)=>(
      <div key={uuid()} className="flex space-x-3 my-2">

       <div className='rounded-full'>
        <img src={item?.pic} height="40px" width="40px" className='rounded-full'/>
      </div>
      <div className='flex flex-col space-y-3 flex-1 bg-gray-100   p-2 rounded-md'>
        <h1 className='font-semibold'>{item?.User}</h1>
        <p onClick={()=>ShowAll(id)}>{item?.text.length > 150 && ShowText === id ? item?.text.slice(0,150) + "   "+ "See more..." :item?.text}</p>
      </div>
    </div>
    ))
  ) 
}
</div>
 

    </div>
  )
}

export default Feed