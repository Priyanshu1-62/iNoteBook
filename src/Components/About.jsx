import React, { useContext, useEffect } from 'react'
import AuthContext from '../Contexts/authContext';
import AlertContext from '../Contexts/alertcontext';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import Navbar from './Navbar';

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
    <>
    <Navbar/>
    <div className="flex justify-center w-full">
      <section className="absolute top-40 w-3/4 text-black dark:text-amber-50 caret-pink-600 selection:bg-pink-300 dark:selection:bg-pink-800">
        <div>
          <h1 className="mb-8 w-fit text-2xl md:text-3xl lg:text-4xl border-b-4 border-double border-stone-600 dark:border-amber-50">Let me know what you think</h1>
        </div>
        <div>
          <div className="flex gap-2 mb-2">
            <div>&#128312;</div>
            <p>This is my first full-stack (MERN-stack) project.</p>
          </div>
          <div className="flex gap-2 mb-2">
            <div>&#128312;</div>
            <div>
              <p>While the core project idea is fairly simple, I've focused on incorporating many professional technologies and techniques to make this project stand out and deliver a smooth user experience. Find out more about it on Github :</p>
              <a className="flex my-1 w-fit text-blue-700 dark:text-blue-300 hover:underline" target="_blank" href="https://github.com/Priyanshu1-62/iNoteBook.git">
                <p>Frontend</p>
                <ExternalLink className="w-3 h-3"/>
              </a>
              <a className="flex mt-2 w-fit text-blue-700 dark:text-blue-300 hover:underline" target="_blank" href="https://github.com/Priyanshu1-62/iNoteBook-Server.git">
                <p>Backend</p>
                <ExternalLink className="w-3 h-3"/>
              </a>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <div>&#128312;</div>
            <div className="flex flex-wrap w-fit">
              <p className="">To report a bug or share suggestions, feel free to mail me at : &nbsp;</p>
              <p className="border-b-2 border-dashed border-black dark:border-amber-50 w-fit">bpriyanshu5678@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default About