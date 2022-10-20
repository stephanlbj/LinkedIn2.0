import React, {useEffect, useRef, useState} from 'react'
import { useMyContext } from '../Context/Postcontext'
import {MdCancel, MdPhotoLibrary} from "../Icon"
import { doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import {db, storage} from "../Firebase"
import Loading from "./Loading"
import toast from 'react-hot-toast';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes, uploadString } from "firebase/storage";



type FileProps = {
  lastModified?:number
  lastModifiedDate?:string
  type:string
  webkitRelativePath?:string
  size?:number
  name:string
}



const Postcompo = () => {

    const {IsPostFormActive,setIsPostFormActive, UserInfo} = useMyContext()
    const Ref = useRef<HTMLDivElement | null>(null);
    const RefInput = useRef<HTMLDivElement | null>(null);
    const PhotoRef = useRef<HTMLInputElement | null>(null);
    const [textareaVal, setTextareaVal] = useState("")
    const [image, setimage] = useState(null)
    const [File, setFile] = useState(null)
    const [Is_Sending, setIs_sending] = useState(false)
    const [NumbrselectedFile, setNumbrselectedFile] = useState(0);
    const [ImageUrl, setImageUrl] = useState("");
 
    const [fileName,setfileName]=useState("")


   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    

    const reader = new FileReader()
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (allowedExtensions.exec(e.target.files[0].name)) {
      
      setfileName(e.target.files[0].name)

      if(e.target.files[0]){

      reader.readAsDataURL(e.target.files[0])
      }

      reader.onload = (readerEvent:any) =>{
        setFile(readerEvent.target?.result)
      }
   
    }
    else {
      toast.error('Sorry! The file type is not supported!!')
  
    }


    setNumbrselectedFile( e.target.files.length)
    // setNumbrselectedFile(v =>(
    //    e.target.files !== null ? v + e.target.files.length : 0
    // ))
}
    
const SendData = async (e:React.FormEvent) =>{
e.preventDefault()

 
if(File != null){

  const storageRef = ref(storage, 'images/'+ fileName);


  await uploadString(storageRef, File, "data_url").then(async () => {
    const downloadURL = await getDownloadURL(storageRef);
 
    try {
      setIs_sending(true)
      const docRef = await addDoc(collection(db, "Posts"), {
        Text: textareaVal===""?null :textareaVal,
        UserName: UserInfo.name,
        Pic:UserInfo.imageUrl,
        image:downloadURL,
        likes:[],
        comments:[],
        timestamp: serverTimestamp()
      });
    
      if(docRef.id){
        setTextareaVal("")
        setIs_sending(false)
        setIsPostFormActive(false)
        setFile(null)
        setfileName("")
        setNumbrselectedFile(0)
        toast.success('Post submitted successfully!!',{
        icon: '👏',
      })
        //console.log("Document written with ID: ", docRef.id);
      }
     
    } catch (e) {
      setIs_sending(false)
      toast.error('Sorry, an error occured!!')
     // console.error("Error adding document: ", e);
    }


  }).catch((err)=>{
   toast.error(err.message)
  });




}
else {
  try {
    setIs_sending(true)
    const docRef = await addDoc(collection(db, "Posts"), {
      Text: textareaVal,
      UserName: UserInfo.name,
      Pic:UserInfo.imageUrl,
      image:null,
      likes:[],
      comments:[],
      timestamp: serverTimestamp()
    });
  
    if(docRef.id){
      setTextareaVal("")
      setIs_sending(false)
      setIsPostFormActive(false)
      toast.success('Post submitted successfully!!',{
      icon: '👏',
    })
      //console.log("Document written with ID: ", docRef.id);
    }
   
  } catch (e) {
    setIs_sending(false)
    toast.error('Sorry, an error occured!!')
   // console.error("Error adding document: ", e);
  }
}

}

  useEffect(()=>{

    
function handler(event: MouseEvent ){
  
if(Ref?.current?.contains(event?.target as HTMLElement) 
&&  !RefInput?.current?.contains(event?.target as HTMLElement)
){
        setIsPostFormActive(false)
        setTextareaVal("")
       // setNumbrselectedFile(0)
       }
    }
    document.addEventListener("click",handler)
 return ()=>{
      document.removeEventListener("click",handler)
    }

  })

 
  const HideForm = ()=>{
    setIsPostFormActive(false)
    setTextareaVal("")
    setNumbrselectedFile(0)
  }

  

  return (
    <div ref={Ref}  className={`${!IsPostFormActive && "hidden"}   fixed left-0 top-0 right-0 bottom-0 bg-black z-50 opacity-90`}>
        <div  ref={RefInput} className='relative bg-white w-9/12  sm:w-7/12 md:w-6/12 lg:w-5/12 mx-auto rounded-md h-full'>
<div className='flex items-center justify-between border-b border-gray-300 w-full p-2'>
<h1 className='text-black text-xl'>Create a post</h1>
<MdCancel onClick={()=>HideForm()} className='Icon h-5 w-5'/>
</div>
<div className=' flex items-center space-x-3  w-full p-2'>
<img
src={UserInfo.imageUrl}
height="50px"
width="50px"
className='rounded-full'
/>
<h1 className='text-black font-semibold'>{UserInfo.name}</h1>
</div>

{
  Is_Sending && <div className='flex flex-col space-y-4 items-center justify-center absolute bottom-10 inset-x-0'>
    <h1 className='text-center'>Loading...</h1>
    <img
  src='/imgs/git1.gif'
  height="100"
  width="100"
  />
  </div>
}

<form onSubmit={SendData}>
<textarea
aria-multiline
value={textareaVal}
onChange={(e)=>setTextareaVal(e.target.value)}
className='w-full p-2 outline-none'
placeholder='What do you want to talk about?'
/>

<div  className='absolute bottom-3 left-5 flex items-center space-x-3'>
<MdPhotoLibrary onClick={()=>PhotoRef.current?.click()} className='Icon h-6 w-6 cursor-pointer' />
{NumbrselectedFile > 0 && <h1>{NumbrselectedFile} file selected.</h1>}
<input 
type='file' 
hidden 
 ref={PhotoRef}
 name="photo"
 
 onChange={handleChange} />
</div>

<div className='absolute bottom-3 right-5'>
<div className={` ${File != null ||  textareaVal ? "bg-[#067D11] text-white " : "bg-gray-300 text-gray-400"}  px-3 py-1 cursor-pointer  rounded-full `}>

<button disabled={File === null && textareaVal=== "" ? true : false} type="submit">Post</button>
</div>
</div>

</form>


        </div>
        
    </div>
  )
}

export default Postcompo