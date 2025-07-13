import React, { useContext, useEffect } from 'react'
import Notes from './Notes'
import Alert from './Alert'
import AuthContext from '../Contexts/authContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Home() {
  const { isLoading, isAuthorized }=useContext(AuthContext);
  const navigte=useNavigate();
  useEffect(()=>{
    if((!isLoading) && (!isAuthorized)){
      navigte("/auth");
    }
  }, [isLoading, isAuthorized]);
  return (
    <>
    <Navbar/>
    <Alert/>
    <Notes/>
    </>
  )
}

export default Home