import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import Loading from '../components/Loading';
import Maincom from '../components/Maincom'
import Postcompo from '../components/Postcompo'
import { useMyContext } from '../Context/Postcontext';

const Home = () => {

 

  return (
    <div>
       <Header/>
      <Maincom/>
      <Postcompo/>
    </div>
  )
}

export default Home