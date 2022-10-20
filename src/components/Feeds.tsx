import React ,{useState,useEffect}from 'react'
import Feed from './Feed'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {db} from "../Firebase"
import Loading from './Loading';
import {PostProps} from "../MyTypes"


const Feeds = () => {

  const [Posts, setPost] = useState<PostProps[]>([])

  useEffect(()=>{
 
    const unsub = onSnapshot(  query( collection(db, "Posts"),orderBy('timestamp', 'desc'))
      
      , (doc) => {
    
  setPost( doc.docs.map((item)=>(
        {id:item.id ,Text:item.data().Text,
           Pic:item.data().Pic, 
          UserName:item.data().UserName,
          image:item.data().image,
          likes:item.data().likes,
          comments:item.data().comments,
          timestamp:item.data().timestamp

 }
      )))
     
  }, 
    (error) => {
      // ...
      console.log(error.message)
   
  });

  return ()=>unsub()
  },[ ])



  return (
    <div className=''>
       { Posts.length > 0 ?
        Posts.map((item, ind)=>(
            <Feed key={item.id} 
              UserName={item.UserName}
              ProPic={item.Pic}
              Img={item.image} 
              text={item.Text}
              id={item.id}
              likes={item.likes}
              comments={item.comments}
              time={item.timestamp}
             />
        ))
        :
       (
        <Loading/>
       )
       }
        
    </div>
  )
}

export default Feeds