import React, { useContext } from 'react'
import Alert from './Alert'
import AuthContext from '../Contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Spinner from './Spinner';

function Landing() {
  const {rememberMe, loadingLanding, setLoadingLanding}=useContext(AuthContext);
  const navigate=useNavigate();
  const handlestart = async ()=>{
    setLoadingLanding(true);
    const rememberme=localStorage.getItem('rememberme');
    if(rememberme===null || rememberme==='false'){
      setLoadingLanding(false);
      navigate('/auth');
    }
    const response=await rememberMe();
    setLoadingLanding(false);
    if(response.ok) navigate('/home');
    else navigate('/auth');
  }
  // flex justify-center mt-20 sm:mt-36 md:mt-44
  return (
    <>
    <Alert/>
    <main className="flex flex-col justify-center items-center w-lvw h-lvh">
      <section className="relative flex flex-col w-4/5 md:w-3/4 px-3 py-3 backdrop-blur-[64px]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-800 mb-7">iNoteBook - your second brain</h1>
        <p className="text-base md:text-lg mb-2">- Save your insights, Eureka moments and hot teas anytime, anywhere, from any device. </p>
        <p className="text-base md:text-lg mb-2">- Explore dark mode, create Notes super easily, and manage them with visual ease. </p>
        <p className="text-base md:text-lg mb-2">- For project infrastructure details or to report a bug, check out the Feedback section.. </p>
        <div className="flex flex-row-reverse mt-3">
          <button disabled={loadingLanding} className={`flex px-3 py-2 md:px-3 md:py-2 w-fit bg-[#151833] text-white font-bold border-4 border-cyan-900 rounded-xl ${loadingLanding?"opacity-50 cursor-not-allowed":"opacity-100 hover:bg-[#2c2f4a] active:bg-[#1e2351] cursor-pointer"}`} onClick={handlestart}>
            <p className="text-sm md:text-base">Get Started &nbsp;</p>
            <ArrowRight />
          </button>
        </div>
        {loadingLanding && <div className="absolute -top-14 w-full">
          <Spinner />
        </div>}
      </section>
      <footer className="absolute bottom-2 flex justify-center w-full mx-2 text-sm md:text-base font-bold text-stone-800">
          <p>The server may take up to a minute to wake up. Thanks for your patience!</p>
      </footer>
    </main>
    </>
  )
}

export default Landing