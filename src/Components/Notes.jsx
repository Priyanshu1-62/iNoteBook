import React, { useContext, useState, useEffect, useRef } from 'react';
import NoteContext from '../Contexts/noteContext';
import NoteItem from './NoteItem';
import AuthContext from '../Contexts/authContext';
import AlertContext from '../Contexts/alertcontext';
import { FilePlus } from 'lucide-react'
import Prompt from './Prompt';
import Spinner from './Spinner';

function Notes() {
  const idRef=useRef(null);
  const formRef=useRef(null);
  const {refresh, logout, loadingNotes, setLoadingNotes}=useContext(AuthContext);
  const {handleAlert}=useContext(AlertContext);
  const {myNotes, addNote, getNotes, editNote, deleteNote}=useContext(NoteContext);
  const [addingNote, setaddingNote]=useState(false);
  const [updatingNote, setupdatingNote]=useState(false);
  const [showPrompt, setShowPrompt]=useState(false);
  const [deletePrompt, setDeletePrompt]=useState(false);
  const [formDatas, setformDatas]=useState({
    "title": "",
    "description": "",
    "tag": ""
  });
  //Create Note
  const handleAddNote = ()=>{
    if(addingNote || updatingNote || showPrompt) return;
    setaddingNote(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }
  const handleCreateBtn = async (e)=>{
    try {
      setLoadingNotes(true);
      e.preventDefault();
      let response=await addNote(formDatas);
      if(response.status===401){
        await refresh();
        response=await addNote(formDatas);
      }
      if(response.ok){
        setLoadingNotes(false);
        setaddingNote(false);
        setformDatas({ title: '', description: '', tag: '' });
        handleAlert({ heading: "Success", message: "Note created successfully", colour: "green" });
        return;
      }
      const res=await response.json();
      setLoadingNotes(false);
      if(response.status===401){
        handleAlert({ heading: "Unauthorized !!", message: "Please Signup/Login to continue", colour: "red" });
        await logout();
      }
      else if(response.status===500) handleAlert({ heading: "Oops!!", message: res.errors, colour: "yellow" });
      if(response.status!==401 && response.status!==500) handleAlert({ heading: "Invalid input", message: res.errors, colour: "red" });
    } 
    catch (error) {
      handleAlert({ heading: "Oops!!", message: "check your network connection or try again later", colour: "yellow" });
    }
  }
  
  //Update Note
  const handleupdateNote = (id, data)=>{
    if(addingNote || updatingNote || showPrompt) return;
    setupdatingNote(true);
    setformDatas({title:data.title, description: data.description, tag: data.tag});
    idRef.current=id;

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }
  const handleUpdateBtn = async (e)=>{
    try {
      setLoadingNotes(true);
      e.preventDefault();
      let response=await editNote(idRef.current, formDatas);
      if(response.status===401){
        await refresh();
        response=await editNote(idRef.current, formDatas);
      }
      if(response.ok){
        setLoadingNotes(false);
        setupdatingNote(false);
        setformDatas({ title: '', description: '', tag: '' });
        handleAlert({ heading: "Success", message: "Note updated successfully", colour: "green" });
        return;
      }
      const res=await response.json();
      setLoadingNotes(false);
      if(response.status===401){
        handleAlert({ heading: "Unauthorized !!", message: "Please Signup/Login to continue", colour: "red" });
        await logout();
      }
      else if(response.status===500) handleAlert({ heading: "Oops!!", message: res.errors, colour: "yellow" });
      else if(response.status===403) handleAlert({ heading: "Failed to edit", message: res.errors, colour: "red" })
      else handleAlert({ heading: "Invalid input", message: res.errors, colour: "red" });
    } 
    catch (error) {
      handleAlert({ heading: "Oops!!", message: "check your network connection or try again later", colour: "yellow" });
    }
  }

  //Delete Note
  const handleDeleteNote = async (id)=>{
    if(addingNote || updatingNote || showPrompt) return;
    idRef.current=id;
    setShowPrompt(true);
  }
  const handleDeleteAfterConfirm = async ()=>{
    try {
      setLoadingNotes(true);
      const id=idRef.current;
      let response=await deleteNote(id);
      if(response.status===401){
        await refresh();
        response=await deleteNote(id);
      }
      if(response.ok){
        setLoadingNotes(false);
        handleAlert({ heading: "Success", message: "Note deleted successfully", colour: "green" });
        return;
      }
      const res=await response.json();
      setLoadingNotes(false);
      if(response.status===401){
        handleAlert({ heading: "Unauthorized !!", message: "Please Signup/Login to continue", colour: "red" });
        await logout();
      }
      else handleAlert({ heading: "Failed to delete", message: res.errors, colour: "red" });
    } 
    catch (error) {
      handleAlert({ heading: "Oops!!", message: "check your network connection or try again later", colour: "yellow" });
    }
  }
  useEffect(()=>{
    if (deletePrompt) {
      handleDeleteAfterConfirm();
      setDeletePrompt(false);
    }
    return ()=>{
      setDeletePrompt(false);
    };
  }, [deletePrompt]);

  //Dismiss form
  const handleCross = ()=>{
    setformDatas({ title: '', description: '', tag: '' });
    setaddingNote(false);
    setupdatingNote(false);
  }

  //Get Notes
  const handleGetNotes= async ()=>{
    try {
      setLoadingNotes(true);
      let response=await getNotes();
      if(response.status===401){
        await refresh();
        response=await getNotes();
      }
      if(response.ok){
        setLoadingNotes(false);
        return;
      }
      const res=await response.json();
      setLoadingNotes(false);
      if(response.status===401){
        handleAlert({ heading: "Unauthorized !!", message: "Please Signup/Login to continue", colour: "red" });
        await logout();
      }
      else handleAlert({ heading: "Oops!!", message: res.errors, colour: "yellow" });
    } 
    catch (error) {
      handleAlert({ heading: "Oops!!", message: "check your network connection or try again later", colour: "yellow" });
    }
  }
  useEffect(()=>{
    handleGetNotes();
  }, []);
  
  //Disable scrolling while prompting
  useEffect(()=>{
    if(showPrompt){
      document.body.style.overflow="hidden";
    }
    else{
      document.body.style.overflow="auto";
    }
    return ()=>{
      document.body.style.overflow="auto";
    };
  }, [showPrompt]);
  return (
    <>
    {loadingNotes && (!addingNote) && (!updatingNote) && <div className="fixed flex items-center w-lvw h-lvh">
      <Spinner />
    </div>}
    <div className={`${showPrompt ? "opacity-30" : ""} mx-1`}>
      <div className="flex justify-center mt-28 w-full">
        <h1 className="mx-3 mb-2 text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-amber-50">Your personal notes straight from cloud &#9729;</h1>
      </div>
      <div className="flex justify-end w-full mt-6">
        <button disabled={addingNote} className={`flex mx-3 bg-[#003049] dark:bg-yellow-500 text-white dark:text-black font-bold px-3 py-2 border-2 border-cyan-600 rounded-2xl ${(addingNote || updatingNote)?"opacity-50 cursor-not-allowed":"opacity-100 cursor-pointer hover:bg-[#105479] active:bg-cyan-900 dark:hover:bg-yellow-600 dark:active:bg-yellow-700"}`} onClick={handleAddNote
        }>
          <FilePlus />
          <h3>&nbsp; New Note</h3>
        </button>
      </div>
      <div className="h-fit flex justify-center my-3">
        <form ref={formRef} onSubmit={updatingNote?handleUpdateBtn:handleCreateBtn} className={`relative dark:bg-[#000814] border-2 border-stone-700 dark:border-stone-400 rounded-xl transition-all duration-300 ease-in overflow-hidden ${(addingNote || updatingNote) ? "max-h-fit opacity-100" : "max-h-0 opacity-0"}`}>
          <button disabled={loadingNotes} type="button" className="absolute top-1 right-1 px-1 py-1 cursor-pointer" onClick={handleCross}>
            &#10060;
          </button>
          <div className="flex justify-center w-full h-5 mt-13 ml-2 mr-4 text-md font-extrabold text-gray-700 dark:text-amber-50">
          {updatingNote?`Tweak, Tune, Perfect \u2728` : `Let Your Thoughts Take Flight \u2708`}
          </div>
          <div className="mt-10 mx-5">
            <input name="title" value={formDatas.title} onChange={(e)=> setformDatas(prev=>({...prev, title:e.target.value})) } className="w-75 md:w-120 my-1 px-2 py-1 caret-pink-600 selection:bg-pink-300 dark:selection:bg-pink-800 focus:outline-none border-b-1 dark:border-white text-sm text-black dark:text-amber-50 placeholder:font-bold placeholder:opacity-55 placeholder:text-black dark:placeholder:text-white" type="text" placeholder="Title (min 3 chars)"></input>
          </div>
          <div className="my-5 mx-5">
            <textarea name="description" value={formDatas.description} onChange={(e)=> setformDatas(prev=>({...prev, description:e.target.value})) } autoComplete="off" className="w-75 h-24 resize-none md:w-120 my-1 px-2 py-1 caret-pink-600 selection:bg-pink-300 dark:selection:bg-pink-800 tracking-wide focus:outline-none border-b-1 dark:border-white text-sm text-black dark:text-amber-50 text-wrap placeholder:font-bold placeholder:opacity-55 placeholder:text-black dark:placeholder:text-white" placeholder="Description (min 3 chars)"></textarea>
          </div>
          <div className="my-5 mx-5">
            <input name="tag" value={formDatas.tag} onChange={(e)=> setformDatas(prev=>({...prev, tag:e.target.value})) } className="w-75 md:w-120 my-1 px-2 py-1 caret-pink-600 selection:bg-pink-300 dark:selection:bg-pink-800 focus:outline-none border-b-1 dark:border-white text-sm text-black dark:text-amber-50 placeholder:font-bold placeholder:opacity-55 placeholder:text-black dark:placeholder:text-white" type="text" placeholder="Tag (min 3 chars)"></input>
          </div>
          <button type="submit" disabled={loadingNotes && (addingNote || updatingNote)} className={`text-xs text-black dark:text-amber-50 w-75 md:w-120 mb-5 mx-5 px-[0.5rem] py-[0.18rem] font-bold border-1 border-stone-500 dark:border-stone-300 bg-stone-300 dark:bg-stone-500 drop-shadow-xl ${loadingNotes && (addingNote || updatingNote)?"opacity-50 cursor-not-allowed":"cursor-pointer hover:bg-stone-400 active:bg-stone-500 dark:hover:bg-stone-600 dark:active:bg-stone-700"}`}>{updatingNote?`Update` : `Create`}</button>
          <div className="flex justify-center text-xs text-black dark:text-amber-50 mx-5 mb-5">
            {updatingNote?`Updated note will remain in its original position.` : `New note will appear at the end of the list`}
          </div>
          {loadingNotes && (addingNote || updatingNote) &&<div className="absolute top-40 w-full">
          <Spinner />
          </div>}
        </form>
      </div>
      {!loadingNotes &&
      <>
      {myNotes.length===0 && <div className="mx-6 my-3">
        <h2 className="text-sm text-black dark:text-amber-50">No notes to display</h2>
      </div>}
      {myNotes.length>0 && <div className="grid grid-cols-1 lg:grid-cols-2">
        {myNotes.map((element)=>{
          return <NoteItem key={element._id} note={element} handleupdateNote={handleupdateNote} handleDeleteNote={handleDeleteNote}></NoteItem>
        })}
      </div>}
      </>
      }
    </div>
      {showPrompt && <Prompt setShowPrompt={setShowPrompt} setDeletePrompt={setDeletePrompt}/>}
    </>
  )
}

export default Notes