import React , { useRef, useState, FocusEvent, useEffect}from 'react'
import {FcGoogle} from "../Icon"
import { GoogleLogin,GoogleLoginResponse } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useMyContext } from '../Context/Postcontext';
import { json } from 'stream/consumers';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



type Props = {
  Value:string
  setVal:React.Dispatch<React.SetStateAction<string>>
  placeHolder:string
  Ref:React.MutableRefObject<null>
  Handle:(e: FocusEvent<HTMLInputElement>) => void
  IS_focus:boolean
}



type UseProfile = {

  Ca?:string
accessToken? :string
googleId?:string
profileObj:{
  email:string
  familyName:string
  givenName:string
  googleId:number
  imageUrl:string
  name:string

}
tokenId?:string
tokenObj?:{
  token_type?:string
  access_token?:string
  expires_in?:number
}
wt?:{}
xc?:{}

}
 
 
const InputForm = ({Value, setVal, placeHolder, Ref, Handle, IS_focus}:Props) =>(


  <input
  ref={Ref}
  value={Value}
  onFocus={Handle}
  onChange={(e)=>setVal(e.target.value)}
  placeholder={placeHolder}
  className={` border border-gray-500 py-2 px-2`}
  />
)


const Signup = () => {

  const [InputVal,setInputVal]= useState("")
  const [InputPass,setInputInputPass]= useState("")
  const [IsFocus,setIsFocus] = useState(false)
  const Ref = useRef(null)
  const {setUserInfo} = useMyContext()
  const navigate = useNavigate();
  const {LocalStorageData,setLocalStorageData} = useMyContext()
  //string | undefined

 //const ClientID = process.env.REACT_APP_CLIENT_ID




const ID_Client = "596770311066-9orgc0i8qld468teceteinr5mkt238u4.apps.googleusercontent.com"
   

  const onSuccess = ({profileObj
  }: any) => {
 //console.log('success:',profileObj );

    setUserInfo({
      email:profileObj.email,
      familyName:profileObj.familyName,
      givenName:profileObj.givenName,
      googleId:profileObj.googleId,
      imageUrl:profileObj.imageUrl,
      name:profileObj.name
    })

    const UserData = JSON.stringify(profileObj)
    setLocalStorageData(UserData)
    window.localStorage.setItem("userinfo",UserData)
    navigate("/Home")
    console.log("GreatW")
    
};


const onFailure = (err:any) => {
    console.log('failed:', err);
    navigate("/")
};

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: ID_Client ,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });


  const handleFocusEvent = (e: FocusEvent<HTMLInputElement>) => {
    // Do something
    toast("Welcome to ink App! please, use the google button in order to login.", {
      icon: '👏',
    })
    setIsFocus(true)
  };

  useEffect(()=>{
    if(typeof window !== "undefined"){
      if(LocalStorageData !== null){
        navigate("/Home")
      }
    }
  
  },[LocalStorageData])


  return (
    <div className='flex items-center justify-center h-screen py-4'>
    <div className='shadow-xl w-8/12 sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 bg-white rounded-md p-3 flex flex-col space-y-3 '>
    <h1 className='text-2xl font-semibold'>Sign in</h1>

<p>Stay updated on your professional world</p>

<div className='flex flex-col space-y-4 mt-2'>
<InputForm Value={InputVal} setVal={setInputVal} placeHolder="Email or Phone" Ref={Ref} Handle={handleFocusEvent} IS_focus={IsFocus} />
<InputForm Value={InputPass} setVal={setInputInputPass} placeHolder="Password"  Ref={Ref} Handle={handleFocusEvent} IS_focus={IsFocus}/>
     
</div> 

<h1 className='text-[16px] font-semibold text-[#067D11]'>Forgot password?</h1>


<div className='cursor-pointer bg-[#067D11] px-2 py-1 rounded-full flex items-center justify-center w-8/12 mx-auto'>
<h1 className='text-white'>Sign in</h1>
</div>


<div className='flex items-center space-x-2'>
  <div className='flex-1 border-b border-gray-200'></div>
  <h1>or</h1>
  <div className='flex-1 border-b border-gray-200'></div>

</div>

 
<GoogleLogin
          clientId={ID_Client}
          buttonText="Sign in"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          
          className="cursor-pointer border border-gray-500 px-2 py-1 rounded-full flex items-center space-x-2 justify-center w-8/12 mx-auto"
      />
 
  
    </div>
    </div>
  )
}

export default Signup