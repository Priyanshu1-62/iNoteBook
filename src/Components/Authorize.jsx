import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Alert from './Alert'

function Authorize() {
  const [isLoggedin, setisLoggedin]=useState(false);
  return (
    <>
    <Alert/>
    {!isLoggedin && <SignupForm setisLoggedin={setisLoggedin}/>}
    {isLoggedin && <LoginForm setisLoggedin={setisLoggedin}/>}
    </>
  )
}

export default Authorize