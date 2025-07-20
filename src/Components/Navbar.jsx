import React, { useState, useContext } from 'react';
import { Link } from "react-router";
import AuthContext from '../Contexts/authContext';
import { useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import Spinner from './Spinner';

function Navbar() {
  const location=useLocation();
  const {logout, loadingExit}=useContext(AuthContext);
  const [visibility, setvisibility]=useState(false);
  const [darkMode, setdarkMode]=useState(false);
  const handletoggleMode = ()=>{
    document.documentElement.classList.toggle('dark');
    setdarkMode(prev => !prev);
  }
  const handleClick2 = ()=>{
    setvisibility((prev) => !prev);
  }
  const handleLogout = async ()=>{
    await logout();
  }
  return (
    <>
    {location.pathname!=='/' && location.pathname!=='/auth' &&
    <>
    {loadingExit && <div className="fixed flex items-center w-lvw h-lvh">
      <Spinner />
    </div>}
      <div className="h-1 bg-[#8d99ae]"></div>

      <nav className={`fixed top-0 z-40 flex items-center w-full p-3 bg-[#b5e48c] dark:bg-[#5e548e] text-black dark:text-white ${visibility ? "" : "shadow-2xl shadow-[#1a1c2c]"}`}>
          <Link className="ml-3 mr-2 px-1 cursor-pointer text-xl font-mono font-bold text-stone-800 dark:text-white opacity-85 hover:opacity-100" to='/'>iNoteBook</Link>

          <ul className="hidden md:flex items-center">
              <Link className={`mx-2 px-2 py-1 w-fit cursor-pointer opacity-70 font-extralight hover:font-normal ${location.pathname==="/home"?"opacity-100 font-normal active:font-extralight":""}`} to='/home'>Home</Link>
              <Link className={`mx-2 px-2 py-1 w-fit cursor-pointer opacity-70 font-extralight hover:font-normal ${location.pathname==="/feedback"?"opacity-100 font-normal active:font-extralight":""}`} to='/feedback'>Feedback</Link>
          </ul>
          <div className="w-full flex items-center justify-end">
          <button disabled={loadingExit} className={`hidden md:flex text-xs w-fit px-[1rem] py-[0.3rem] mr-7 rounded-xl font-bold border-b-3 border-black dark:border-white bg-[#92c962] dark:bg-[#50477e] drop-shadow-xl ${loadingExit?"opacity-50 cursor-not-allowed":" cursor-pointer hover:bg-[#7fa35f] dark:hover:bg-[#3b345e]"}`} onClick= {handleLogout}>LOG OUT</button>
            <button className=" mr-7 px-1 py-1 cursor-pointer" onClick= {handletoggleMode}>
              {darkMode && <Sun className="w-6 h-6"/>}
              {!darkMode && <Moon className="w-6 h-6"/>}
            </button>
            <button className="bg-[#7fa35f] dark:bg-[#3b345e] hover:bg-[#65854a] dark:hover:bg-[#221e39] active:bg-[#4e6a37] dark:active:bg-[#2c274a] cursor-pointer px-2 py-1 mr-3 rounded-lg drop-shadow-xl md:hidden" onClick={handleClick2}>&#9776;</button>
          </div>
      </nav>
      
      <div className={`fixed top-12 z-40 flex flex-col divide-gray-500 w-full py-1 bg-[#7fa35f] dark:bg-[#3b345e] text-black dark:text-white md:hidden transition-all duration-300 ease-in-out overflow-hidden ${visibility ? "max-h-60 py-2 opacity-100" : "max-h-0 py-0 opacity-0"}`}>
        <Link className={`mx-2 px-2 py-1 w-fit cursor-pointer opacity-70 font-extralight hover:font-normal ${location.pathname==="/home"?"opacity-100 font-normal active:font-extralight":""}`} to='/home'>Home</Link>
        <hr></hr>
        <Link className={`mx-2 px-2 py-1 w-fit cursor-pointer opacity-70 font-extralight hover:font-normal ${location.pathname==="/feedback"?"opacity-100 font-normal active:font-extralight":""}`} to='/feedback'>Feedback</Link>
        <hr></hr>
        <button disabled={loadingExit} className={`ml-3 mr-8 mt-2 mb-0 text-xs w-fit px-[1rem] py-[0.3rem] rounded-xl font-bold border-b-3 border-black dark:border-white bg-[#92c962] dark:bg-[#50477e] drop-shadow-xl ${loadingExit?"opacity-50 cursor-not-allowed":"cursor-pointer hover:bg-[#7fa35f] dark:hover:bg-[#3b345e]"}`} onClick={handleLogout}>LOG OUT</button>
      </div>
    </>
    }
    </>
  )
}

export default Navbar