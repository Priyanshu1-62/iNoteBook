import React, { useContext, useState } from 'react'
import AuthContext from '../Contexts/authContext';
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react'
import AlertContext from '../Contexts/alertcontext';
import Spinner from './Spinner';

function SignupForm(props) {
  const {setisLoggedin}=props;
  const {signup, loadingAuth, setLoadingAuth}=useContext(AuthContext);
  const {handleAlert}=useContext(AlertContext);
  const navigate=useNavigate();
  const [passVisibility, setpassVisibility]=useState(false);

  const handleSubmit = async (e)=>{
    try {
      setLoadingAuth(true);
      e.preventDefault();
      const form=e.target;
      const formData=new FormData(form);
      const data=Object.fromEntries(formData.entries());
      const signupdata={
        "name": data.name,
        "email": data.email,
        "password": data.password
      }
      const rememberme=data.rememberme !== undefined;
      if(rememberme) localStorage.setItem("rememberme", 'true');
  
      const response=await signup(signupdata);
      setLoadingAuth(false);
      if(response.ok){
        navigate("/home");
      }
    } 
    catch (error) {
      handleAlert({ heading: "Oops!!", message: "check your network connection or try again later", colour: "yellow" });
    }
  }
  const handleClick = ()=>{
    setisLoggedin(true);
  }
  const handlepassVisibility = ()=>{
    setpassVisibility(prev=>(!prev));
  }
  return (
    <div className="flex flex-col justify-center items-center w-lvw h-lvh mt-7">
      <form onSubmit={handleSubmit} className="relative h-fit w-fit border-r-3 border-b-3 border-stone-600 rounded-xl caret-pink-800 selection:bg-pink-600 backdrop-blur-[64px]">
        <div className="flex justify-center w-full h-5 mt-5 text-md font-extrabold text-gray-700">
          Create an account!
        </div>
        <div className="mt-10 mx-5">
          <input name="name" className="w-60 my-1 px-2 py-1 focus:outline-none border-b-2  text-sm placeholder:font-bold" type="text" placeholder="Name"></input>
        </div>
        <div className="my-5 mx-5">
          <input name="email" className="w-60 my-1 px-2 py-1 focus:outline-none border-b-2  text-sm placeholder:font-bold" type="text" placeholder="Email-ID"></input>
        </div>
        <div className="relative flex mb-3 mx-5">
          <input name="password" className="w-60 my-1 px-2 py-1 focus:outline-none border-b-2  text-sm placeholder:font-bold" type={passVisibility?"text":"password"} placeholder="Password"></input>
          {!passVisibility && <button className="absolute top-2 right-1  py-1 pl-1 cursor-pointer" onClick={handlepassVisibility}><Eye strokeWidth={2.7} size={20} className="text-gray-800"/></button>}
          {passVisibility && <button className="absolute top-2 right-1  py-1 pl-1 cursor-pointer" onClick={handlepassVisibility}><EyeOff strokeWidth={2.7} size={20} className="text-gray-800"/></button>}
        </div>
        <div className="flex mb-4 mx-6">
          <input name="rememberme" className="accent-amber-950  cursor-pointer" type="checkbox"></input>
          <h4 className="ml-1 text-sm text-gray-950">Remember me</h4>
        </div>
        <button type="submit" className="backdrop-blur-[300px]  cursor-pointer text-xs w-60 mb-5 mx-5 px-[0.5rem] py-[0.18rem] font-bold border-1 border-stone-500 hover:bg-stone-400 active:bg-stone-500 drop-shadow-xl">Signup</button>
        <div className="text-xs mx-5 mb-5 flex justify-center">
          Already have an account?
          <button type="button" className="cursor-pointer underline underline-offset-4" onClick={handleClick}>Login</button>
        </div>
        <div className="absolute -top-20 w-full">
          {loadingAuth && <Spinner />}
        </div>
      </form>
    </div>
  )
}

export default SignupForm