import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from './Navbar';
import Alert from './Alert';
import NoteContext from '../Contexts/noteContext';
import AuthContext from '../Contexts/authContext';
import AlertContext from '../Contexts/alertcontext';
import Prompt from './Prompt';
import Spinner from './Spinner';

function MyNote() {
    const { id }=useParams();
    const navigate=useNavigate();
    const [content, setContent]=useState("description");
    const {refresh, logout, loadingNotes, setLoadingNotes}=useContext(AuthContext);
    const {handleAlert}=useContext(AlertContext);
    const {myNotes, ANote, addNote, getNotes, getANote, editNote, deleteNote}=useContext(NoteContext);
    const [updatingNote, setupdatingNote]=useState(false);
    const [showPrompt, setShowPrompt]=useState(false);
    const [deletePrompt, setDeletePrompt]=useState(false);
    const [formDatas, setformDatas]=useState({
        "title": "Dear Sunshine",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "tag": ["Sunflower", "Purple-heart", "Sunflower1", "Purple-heart1", "Sunflower2", "Purple-heart2", "Sunflower3", "Purple-heart3", "Sunflower4", "Purple-heart4", "Sunflower5", "Purple-heart5", "Bosom-friend1"]
    });
    const handleEdit = () => {
        setupdatingNote(true);
    }
    const handleCancel = () => {
        setupdatingNote(false);
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
              setformDatas(ANote);
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
        {loadingNotes && <div className="fixed flex items-center w-lvw h-lvh">
            <Spinner />
        </div>}
        {updatingNote && <form>
            <div className="flex mt-28 px-7 text-stone-700 dark:text-white">
                <h2 className="text-3xl font-bold">{ANote.title}</h2>
            </div>
            <div className="mt-3 px-5 mx-2 border-1 text-black dark:text-white bg-[#b8ceba] dark:bg-[#1c273b]">
                <div className="flex mt-2 text-gray-600 dark:text-white font-bold">
                    <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="description" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("description")}}>Description</button>
                    <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="tags" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("tags")}}>Tags</button>
                    <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="audio" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("audio")}}>Audio</button>
                    <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="images" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("images")}}>Images</button>
                </div>
                <div className={`h-[64vh] bg-white dark:bg-[#000814] border-4 border-blue-700 rounded-lg transition-all duration-150 ease-in`}>
                    {content==="description" && <div className="px-4 py-4 break-all whitespace-pre-wrap">
                        <p>{ANote.description}</p>
                    </div>}
                    {content==="tags" && <div className="flex flex-wrap gap-4 px-4 py-4 overflow-auto">
                        {ANote.tag.map((tag)=>{
                            return <h4 className="text-sm text-black bg-gray-300 px-3 py-1 rounded-lg" key={tag}>{tag}</h4>
                        })}
                    </div>}
                    {content==="audio" && <div className="h-full flex justify-center items-center overflow-auto">
                        <div className="text-gray-400 text-4xl sm:text-6xl lg:text-8xl font-bold -rotate-50 lg:-rotate-30">In Development</div>
                    </div>}
                    {content==="images" && <div className="h-full flex justify-center items-center overflow-auto">
                        <div className="text-gray-400 text-4xl sm:text-6xl lg:text-8xl font-bold -rotate-50 lg:-rotate-30">In Development</div>
                    </div>}
                </div>
                <div className="flex flex-row-reverse gap-5 my-2">
                    <button className="px-5 py-1 text-white bg-green-500 rounded-md cursor-pointer" onClick={()=>{console.log(ANote)}}>Save</button>
                    <button className="px-5 py-1 text-white bg-[#e6aa05] rounded-md cursor-pointer" onClick={handleCancel}>Cancel</button>
                    {content==="audio" && <button className="flex items-center gap-1 px-5 py-1 text-white bg-[#9d4edd] rounded-md cursor-pointer" onClick={handleCancel}><Paperclip size={20}/>Audio</button>}
                    {content==="images" && <button className="flex items-center gap-1 px-5 py-1 text-white bg-[#9d4edd] rounded-md cursor-pointer" onClick={handleCancel}><Paperclip size={20}/>Image</button>}
                </div>
            </div>
        </form>}

        {!updatingNote && 
        <>
        <div className="flex mt-28 px-7 text-stone-700 dark:text-white">
            <h2 className="text-3xl font-bold">{ANote.title}</h2>
        </div>
        <div className="mt-3 px-5 mx-2 border-1 text-black dark:text-white bg-[#b8ceba] dark:bg-[#1c273b]">
            <div className="flex mt-2 text-gray-600 dark:text-white font-bold">
                <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="description" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("description")}}>Description</button>
                <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="tags" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("tags")}}>Tags</button>
                <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="audio" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("audio")}}>Audio</button>
                <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="images" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("images")}}>Images</button>
            </div>
            <div className={`h-[64vh] bg-white dark:bg-[#000814] transition-all duration-150 ease-in`}>
                {content==="description" && <div className="px-4 py-4 break-all whitespace-pre-wrap">
                    <p>{ANote.description}</p>
                </div>}
                {content==="tags" && <div className="flex flex-wrap gap-4 px-4 py-4 overflow-auto">
                    {ANote.tag.map((tag)=>{
                        return <h4 className="text-sm text-black bg-gray-300 px-3 py-1 rounded-lg" key={tag}>{tag}</h4>
                    })}
                </div>}
                {content==="audio" && <div className="h-full flex justify-center items-center overflow-auto">
                    <div className="text-gray-400 text-4xl sm:text-6xl lg:text-8xl font-bold -rotate-50 lg:-rotate-30">In Development</div>
                </div>}
                {content==="images" && <div className="h-full flex justify-center items-center overflow-auto">
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