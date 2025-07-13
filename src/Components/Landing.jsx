import React, { useContext } from 'react'
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
    <div className="flex justify-center w-full">
      <section className="flex flex-col relative mt-10 w-3/4 px-3 py-3 backdrop-blur-[30px]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-800 mb-7">iNoteBook - your second brain</h1>
        <span className="text-lg md:text-xl mb-2">- Save your insights, Eureka moments and hot teas anytime, anywhere, from any device. </span>
        <span className="text-lg md:text-xl mb-2">- Your notes are well secured via email&password authentication, password hashing, session handling and defence against timing attacks. </span>
        <span className="text-lg md:text-xl mb-2">- Explore dark mode, create new Note super easily, get visual info of all your previous notes at one point, and edit/delete them as you please. </span>
        <span className="text-lg md:text-xl mb-2">- For project infrastucture details or to report a bug, checkout Feedback section.. </span>
        <div className="flex flex-row-reverse mt-3">
          <button className="flex px-3 py-2 w-fit cursor-pointer bg-[#151833] text-white font-bold border-4 border-cyan-900 rounded-xl hover:bg-[#2c2f4a] active:bg-[#1e2351]" onClick={handlestart}>
            <span className="">Get Started &nbsp;</span>
            <ArrowRight />
          </button>
        </div>
      </section>
    </div>
    </>
  )
}

export default Landing