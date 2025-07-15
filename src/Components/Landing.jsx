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
    <main className="flex justify-center items-center w-lvw h-lvh">
      <section className="flex flex-col relative w-3/4 px-3 py-3 backdrop-blur-[30px]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-800 mb-7">iNoteBook - your second brain</h1>
        <p className="text-lg md:text-xl mb-2">- Save your insights, Eureka moments and hot teas anytime, anywhere, from any device. </p>
        <p className="text-lg md:text-xl mb-2">- Your notes are well secured via email authentication, password hashing, session control and timing attack protection. </p>
        <p className="text-lg md:text-xl mb-2">- Explore dark mode, create Notes super easily, and manage them with visual ease. </p>
        <p className="text-lg md:text-xl mb-2">- For project infrastructure details or to report a bug, check out the Feedback section.. </p>
        <div className="flex flex-row-reverse mt-3">
          <button className="flex px-3 py-2 w-fit cursor-pointer bg-[#151833] text-white font-bold border-4 border-cyan-900 rounded-xl hover:bg-[#2c2f4a] active:bg-[#1e2351]" onClick={handlestart}>
            <p className="">Get Started &nbsp;</p>
            <ArrowRight />
          </button>
        </div>
      </section>
    </main>
    </>
  )
}

export default Landing