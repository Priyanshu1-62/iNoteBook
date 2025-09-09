import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import Navbar from './Navbar';

function MyNote() {
    const { id }=useParams();
    const [content, setContent]=useState("description");
    const [isEditing, setIsEditing]=useState(false);
    const [noteData, setNoteData]=useState({
        "title": "Dear Sunshine",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "tags": ["Sunflower", "Purple-heart"],
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
        <div className="flex mt-24 px-5">
            <h2 className="text-3xl font-bold text-gray-700">{noteData.title}</h2>
        </div>
        <div className="mt-6 px-5 mx-2 border-1 bg-[#faedcd] dark:bg-[#1c273b]">
            <div className="flex mt-2">
                <button className={`py-1 pr-4 border-slate-700 cursor-pointer ${content==="description" ? "bg-white border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("description")}}>Description</button>
                <button className={`py-1 px-4 border-slate-700 cursor-pointer ${content==="tags" ? "bg-white border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("tags")}}>Tags</button>
                <button className={`py-1 px-4 border-slate-700 cursor-pointer ${content==="audio" ? "bg-white border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("audio")}}>Audio</button>
                <button className={`py-1 px-4 border-slate-700 cursor-pointer ${content==="images" ? "bg-white border-t-1 border-x-1" : ""}`} onClick={()=>{setContent("images")}}>Images</button>
            </div>
            <div className={`h-[64vh] bg-white ${isEditing ? "border-4 border-blue-700 rounded-lg" : ""}`}>
                {content==="description" && <div className="px-4 py-4 overflow-auto">
                    <p>{noteData.description}</p>
                </div>}
                {content==="tags" && <div className="flex gap-4 px-4 py-4">
                    {noteData.tags.map((tag)=>{
                        return <h4 className="text-sm bg-gray-300 px-3 py-1 rounded-lg" key={tag}>{tag}</h4>
                    })}
                </div>}
                {content==="audio" && <div>
                </div>}
                {content==="images" && <div>
                </div>}
            </div>
            {!isEditing && <div className="flex flex-row-reverse gap-5 my-2">
                <button className="px-5 py-1 text-white bg-rose-500 rounded-md cursor-pointer" onClick={handleEdit}>Delete</button>
                <button className="px-5 py-1 text-white bg-blue-500 rounded-md cursor-pointer" onClick={handleEdit}>Edit</button>
            </div>}
            {isEditing && <div className="flex flex-row-reverse gap-5 my-2">
                <button className="px-5 py-1 text-white bg-green-500 rounded-md cursor-pointer" onClick={handleEdit}>Save</button>
                <button className="px-5 py-1 text-white bg-yellow-500 rounded-md cursor-pointer" onClick={handleCancel}>Cancel</button>
            </div>}
        </div>
        </>
    )
}

export default MyNote