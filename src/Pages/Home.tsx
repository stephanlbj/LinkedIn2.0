import React, { useState } from 'react';
import Header from '../components/Header'
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