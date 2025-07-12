import React, { useContext, useEffect } from 'react'
import AuthContext from '../Contexts/authContext';
import AlertContext from '../Contexts/alertcontext';
import { useNavigate } from 'react-router-dom';

function About() {
  const { isLoading, isAuthorized }=useContext(AuthContext);
  const { handleAlert }=useContext(AlertContext);
  const navigte=useNavigate();
  useEffect(()=>{
    if((!isLoading) && (!isAuthorized)){
      handleAlert({ heading: "Unauthorized !!", message: "Login/Signup required", colour: "red" });
      navigte("/auth");
    }
  }, [isLoading, isAuthorized]);
  return (
    <div>
      
    </div>
  )
}

export default About