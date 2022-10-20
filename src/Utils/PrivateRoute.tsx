import React from 'react'
import { Outlet,Navigate} from 'react-router-dom'
import { useMyContext } from '../Context/Postcontext'

const PrivateRoutes = () => {

    const {LocalStorageData} = useMyContext()
 
        
  return (
    LocalStorageData !== null ? <Outlet/> : <Navigate to="/Signup"/>
  )
}

export default PrivateRoutes