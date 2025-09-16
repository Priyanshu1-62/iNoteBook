import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from './Navbar';
import Alert from './Alert';
import NoteContext from '../Contexts/noteContext';
import AuthContext from '../Contexts/authContext';
import AlertContext from '../Contexts/alertcontext';
import Prompt from './Prompt';
import Spinner from './Spinner';
import { Paperclip } from 'lucide-react';

function MyNote() {
    const { id }=useParams();
    const navigate=useNavigate();
    const descriptionRef=useRef(null);
    const tagRef=useRef(null);
    const [content, setContent]=useState("description");
    const {refresh, logout, loadingNotes, setLoadingNotes}=useContext(AuthContext);
    const {handleAlert}=useContext(AlertContext);
    const {myNotes, ANote, addNote, getNotes, getANote, editNote, deleteNote}=useContext(NoteContext);
    const [updatingNote, setupdatingNote]=useState(false);
    const [showPrompt, setShowPrompt]=useState(false);
    const [deletePrompt, setDeletePrompt]=useState(false);
    const [formDatas, setformDatas]=useState({ title: "", description: "", tag: "" });

    const ArrToStr = (arr)=>{
        let str="";
        for(let i=0;i<arr.length;i++){
            str=str.concat(arr[i]);
            str=str.concat(" ");
        }
        return str;
    }
    //Update Note
    const handleEdit = () => {
        if(updatingNote || showPrompt || loadingNotes) return;
        setformDatas({
            "title": ANote.title,
            "description": ANote.description,
            "tag": ArrToStr(ANote.tag)
        });
        setupdatingNote(true);
    }
    const handleCancel = () => {
        setLoadingNotes(false);
        setupdatingNote(false);
    }
    const handleSubmit = async (e) => {
        try {
            setLoadingNotes(true);
            e.preventDefault();
            let response=await editNote(id, formDatas);
            if(response.status===401){
                await refresh();
                response=await editNote(id, formDatas);
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

    // Delete Note
    const handleDeleteNote = async ()=>{
        if(loadingNotes || updatingNote || showPrompt) return;
        setShowPrompt(true);
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

    const handleDeleteAfterConfirm = async ()=>{
        try {
          setLoadingNotes(true);
          let response=await deleteNote(id);
          if(response.status===401){
            await refresh();
            response=await deleteNote(id);
          }
          if(response.ok){
            setLoadingNotes(false);
            handleAlert({ heading: "Success", message: "Note deleted successfully", colour: "green" });
            navigate('/home');
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

    // Get Note
    const handleGetANote = async (noteId) => {
        try {
            setLoadingNotes(true);
            let response=await getANote(noteId);
            if(response.status===401){
              await refresh();
              response=await getANote(noteId);
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
        handleGetANote(id);
    }, []);
    return (
        <>
        <Navbar />
        <Alert />
        {loadingNotes && (!updatingNote) && <div className="fixed flex items-center w-lvw h-lvh">
            <Spinner />
        </div>}
        {updatingNote && <form onSubmit={handleSubmit}>
            <div className="px-2 md:px-5">
                <input 
                    value={formDatas.title} 
                    onChange={(e) => {setformDatas(prev => ({...prev, title:e.target.value}))}} 
                    className="w-full flex mt-28 py-1 text-3xl font-bold text-stone-700 dark:text-white focus:outline-none border-4 border-blue-700 rounded-lg caret-pink-600 selection:bg-pink-300 dark:selection:bg-pink-800"
                    type="text"
                    placeholder="Title (min 3 chars)">
                </input>
            </div>
            <div className="mt-3 px-2 md:px-5 mx-2 border-1 text-black dark:text-white bg-[#b8ceba] dark:bg-[#1c273b] transition-all duration-300 ease-in">
                <div className="flex mt-2 text-gray-600 dark:text-white font-bold">
                    <button type="button" className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="description" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("description")}}>Description</button>
                    <button type="button" className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="tags" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("tags")}}>Tags</button>
                    <button type="button" className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="audio" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("audio")}}>Audio</button>
                    <button type="button" className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="images" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("images")}}>Images</button>
                </div>
                <div className={`h-[64vh] bg-white dark:bg-[#000814] border-4 border-blue-700 rounded-lg transition-all duration-150 ease-in`}>
                    {content==="description" && 
                    <textarea 
                        ref={descriptionRef}
                        value={formDatas.description} 
                        onChange={(e) => {
                            setformDatas(prev => ({...prev, description:e.target.value}));
                        }} 
                        className="w-full h-full px-4 py-4 break-all whitespace-pre-wrap overflow-y-auto focus:outline-none caret-pink-600 selection:bg-pink-300 dark:selection:bg-pink-800"
                        type="text"
                        placeholder="Description (min 3 chars)">
                    </textarea>}
                    {content==="tags" && 
                    <textarea 
                        ref={tagRef}
                        value={formDatas.tag} 
                        onChange={(e) => {
                            setformDatas(prev => ({...prev, tag:e.target.value}));
                        }} 
                        className="w-full h-full flex flex-wrap gap-4 px-4 py-4 break-all whitespace-pre-wrap overflow-y-auto focus:outline-none caret-pink-600 selection:bg-pink-300 dark:selection:bg-pink-800"
                        type="text"
                        placeholder="Tags (Space seperated, min 3 char each)">
                    </textarea>}
                    {content==="audio" && 
                    <div className="h-full flex justify-center items-center overflow-auto">
                        <div className="text-gray-400 text-4xl sm:text-6xl lg:text-8xl font-bold -rotate-50 lg:-rotate-30">In Development</div>
                    </div>}
                    {content==="images" && 
                    <div className="h-full flex justify-center items-center overflow-auto">
                        <div className="text-gray-400 text-4xl sm:text-6xl lg:text-8xl font-bold -rotate-50 lg:-rotate-30">In Development</div>
                    </div>}
                </div>
                <div className="flex flex-row-reverse gap-5 my-2">
                    <button type="submit" className="px-5 py-1 text-white bg-green-500 rounded-md cursor-pointer">Save</button>
                    <button type="button" className="px-5 py-1 text-white bg-[#e6aa05] rounded-md cursor-pointer" onClick={handleCancel}>Cancel</button>
                    {content==="audio" && <button type="button" disabled className="flex items-center gap-1 px-5 py-1 text-white bg-[#9d4edd] rounded-md cursor-pointer" onClick={handleCancel}><Paperclip size={20}/>Audio</button>}
                    {content==="images" && <button type="button" disabled className="flex items-center gap-1 px-5 py-1 text-white bg-[#9d4edd] rounded-md cursor-pointer" onClick={handleCancel}><Paperclip size={20}/>Image</button>}
                </div>
            </div>
        </form>}

        {!updatingNote && 
        <>
        <div className="mt-28 mx-2 md:mx-5 py-1 text-stone-700 dark:text-white border-4 border-transparent caret-pink-600 selection:bg-pink-300 dark:selection:bg-pink-800 transition-all duration-300 ease-in">
            <h2 className="text-3xl font-bold truncate">{ANote.title}</h2>
        </div>
        <div className={`mt-3 px-2 md:px-5 mx-2 border-1 text-black dark:text-white bg-[#b8ceba] dark:bg-[#1c273b] ${showPrompt?"opacity-30":""} transition-all duration-300 ease-in`}>
            <div className="flex mt-2 text-gray-600 dark:text-white font-bold">
                <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="description" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("description")}}>Description</button>
                <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="tags" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("tags")}}>Tags</button>
                <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="audio" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("audio")}}>Audio</button>
                <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="images" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("images")}}>Images</button>
            </div>
            <div className={`h-[64vh] bg-white dark:bg-[#000814] border-4 border-transparent transition-all duration-150 ease-in`}>
                {content==="description" && 
                <div className="h-full px-4 py-4 break-all whitespace-pre-wrap overflow-y-auto caret-pink-600 selection:bg-pink-300 dark:selection:bg-pink-800">
                    <p>{ANote.description}</p>
                </div>}
                {content==="tags" && 
                <div className="flex flex-wrap gap-4 px-4 py-4 overflow-auto caret-pink-600 selection:bg-pink-300 dark:selection:bg-pink-800">
                    {ANote.tag.map((tag)=>{
                        return <h4 className="text-sm text-black bg-gray-300 px-3 py-1 rounded-lg" key={tag}>{tag}</h4>
                    })}
                </div>}
                {content==="audio" && 
                <div className="h-full flex justify-center items-center overflow-auto">
                    <div className="text-gray-400 text-4xl sm:text-6xl lg:text-8xl font-bold -rotate-50 lg:-rotate-30">In Development</div>
                </div>}
                {content==="images" && 
                <div className="h-full flex justify-center items-center overflow-auto">
                    <div className="text-gray-400 text-4xl sm:text-6xl lg:text-8xl font-bold -rotate-50 lg:-rotate-30">In Development</div>
                </div>}
            </div>
            <div className="flex flex-row-reverse gap-5 my-2">
                <button className="px-5 py-1 text-white bg-rose-500 rounded-md cursor-pointer" onClick={handleDeleteNote}>Delete</button>
                <button className="px-5 py-1 text-white bg-blue-500 rounded-md cursor-pointer" onClick={handleEdit}>Edit</button>
            </div>
        </div>
        </>
        }
        {showPrompt && <Prompt setShowPrompt={setShowPrompt} setDeletePrompt={setDeletePrompt}/>}
        </>
    )
}

export default MyNote