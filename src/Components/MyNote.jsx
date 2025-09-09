import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import Navbar from './Navbar';
import { Paperclip } from 'lucide-react';

function MyNote() {
    const { id }=useParams();
    const [content, setContent]=useState("description");
    const [isEditing, setIsEditing]=useState(false);
    const [noteData, setNoteData]=useState({
        "title": "Dear Sunshine",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "tags": ["Sunflower", "Purple-heart", "Sunflower1", "Purple-heart1", "Sunflower2", "Purple-heart2", "Sunflower3", "Purple-heart3", "Sunflower4", "Purple-heart4", "Sunflower5", "Purple-heart5"],
        "attachment": [
            {
                "fileType": "audio",
                "url": "<link>"
            },
            {
                "fileType": "image",
                "url": "<link>"
            }
        ]
    });
    const fetchData = () => {

    }
    const handleEdit = () => {
        setIsEditing(true);
    }
    const handleCancel = () => {
        setIsEditing(false);
    }
    return (
        <>
        <Navbar />
        <div className="flex mt-28 px-7 text-stone-700 dark:text-white">
            <h2 className="text-3xl font-bold">{noteData.title}</h2>
        </div>
        <div className="mt-3 px-5 mx-2 border-1 text-black dark:text-white bg-[#b8ceba] dark:bg-[#1c273b]">
            <div className="flex mt-2 text-gray-600 dark:text-white font-bold">
                <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="description" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("description")}}>Description</button>
                <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="tags" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("tags")}}>Tags</button>
                <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="audio" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("audio")}}>Audio</button>
                <button className={`py-1 px-4 border-slate-700 cursor-pointer transition-colors duration-150 ease-in ${content==="images" ? "bg-white dark:bg-[#000814] border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("images")}}>Images</button>
            </div>
            <div className={`h-[64vh] bg-white dark:bg-[#000814] ${isEditing ? "border-4 border-blue-700 rounded-lg" : ""}`}>
                {content==="description" && <div className="px-4 py-4 overflow-auto">
                    <p>{noteData.description}</p>
                </div>}
                {content==="tags" && <div className="flex flex-wrap gap-4 px-4 py-4 overflow-auto">
                    {noteData.tags.map((tag)=>{
                        return <h4 className="text-sm text-black bg-gray-300 px-3 py-1 rounded-lg" key={tag}>{tag}</h4>
                    })}
                </div>}
                {content==="audio" && <div className="overflow-auto">
                </div>}
                {content==="images" && <div className="overflow-auto">
                </div>}
            </div>
            {!isEditing && <div className="flex flex-row-reverse gap-5 my-2">
                <button className="px-5 py-1 text-white bg-rose-500 rounded-md cursor-pointer" onClick={handleEdit}>Delete</button>
                <button className="px-5 py-1 text-white bg-blue-500 rounded-md cursor-pointer" onClick={handleEdit}>Edit</button>
            </div>}
            {isEditing && <div className="flex flex-row-reverse gap-5 my-2">
                <button className="px-5 py-1 text-white bg-green-500 rounded-md cursor-pointer" onClick={handleEdit}>Save</button>
                <button className="px-5 py-1 text-white bg-[#e6aa05] rounded-md cursor-pointer" onClick={handleCancel}>Cancel</button>
                {content==="audio" && <button className="flex items-center gap-1 px-5 py-1 text-white bg-[#9d4edd] rounded-md cursor-pointer" onClick={handleCancel}><Paperclip size={20}/>Audio</button>}
                {content==="images" && <button className="flex items-center gap-1 px-5 py-1 text-white bg-[#9d4edd] rounded-md cursor-pointer" onClick={handleCancel}><Paperclip size={20}/>Image</button>}
            </div>}
        </div>
        </>
    )
}

export default MyNote