import React, { useState , useEffect} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate  } from "react-router-dom";
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Join from './Pages/Join';
import { useMyContext } from './Context/Postcontext';
import Loading from './components/Loading';



function App() {
 
  const {setUserInfo,  setIsUserSigned} = useMyContext()
  const Localdata  = window.localStorage.getItem("userinfo")
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    if(Localdata){
   
      const Data = JSON.parse(Localdata)
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
       navigate("/")
    }
    else {
      setIsLoading(false)
      navigate("/Signup")
    }
  },[])

  if(isLoading)
  return <Loading/>


  return (
    <div className="">

 
      <Routes>
     
          <Route path="/"       element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Join"   element={<Join />} />
        
      </Routes>
 


    </div>
  );
}

export default App;
