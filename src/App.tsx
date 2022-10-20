import React, { useState , useEffect} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate  } from "react-router-dom";
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Join from './Pages/Join';
import { useMyContext } from './Context/Postcontext';
import Loading from './components/Loading';
import PrivateRoutes from "./Utils/PrivateRoute"


function App() {
 
  const {setUserInfo,  setIsUserSigned,UserInfo,IsUserSigned,
    LocalStorageData, setLocalStorageData} = useMyContext()
 
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)
 

      
  useEffect(()=>{

    if(typeof window !== "undefined"){
    const DataResult = window.localStorage.getItem("userinfo")
    if(DataResult !== null){
    
      setLocalStorageData(DataResult)

  const Data = JSON.parse(DataResult)

      setUserInfo({
        email:Data.email,
        familyName:Data.familyName,
        givenName:Data.givenName,
        googleId:Data.googleId,
        imageUrl:Data.imageUrl,
        name:Data.name,
       })
       setIsUserSigned(true)
       setIsLoading(false)
       navigate("/Home")
     } 
    }
   
 
  },[LocalStorageData])

  // if(isLoading)
  // return <Loading/>

 

  return (
    <div className="">

 
      <Routes>
     
     <Route element={<PrivateRoutes/>}>
     <Route path="/Home" element={<Home />}/>
     </Route>
       
          <Route path="/" element={<Signup />} />
      </Routes>
 


    </div>
  );
}

export default App;
