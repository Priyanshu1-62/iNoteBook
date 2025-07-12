import React, { useContext } from 'react'
import { Link } from "react-router";
import Alert from './Alert'
import AuthContext from '../Contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function Landing() {
  const {rememberMe}=useContext(AuthContext);
  const navigate=useNavigate();
  const handlestart = async ()=>{
    const rememberme=localStorage.getItem('rememberme');
    if(rememberme===null || rememberme==='false') navigate('/auth');

    const response=await rememberMe();
    if(response.ok) navigate('/home');
    else navigate('/auth');
  }
  return (
    <>
    <Alert/>
    <div className="flex relative h-[30rem] ml-24">
      <h1 className="mt-10 text-5xl font-extrabold text-stone-800">iNoteBook - your second brain</h1>
      <button className="absolute flex bottom-0 right-25 cursor-pointer bg-[#151833] text-white font-bold px-3 py-2 border-4 border-cyan-900 rounded-xl hover:bg-[#2c2f4a] active:bg-[#1e2351]" onClick={handlestart}>
        <h3>Get Started &nbsp;</h3>
        <ArrowRight />
      </button>
    </div>
    </>
  )
}

export default Landing