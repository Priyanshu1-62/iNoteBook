import NoteContext from "./noteContext";
import React, {  useState } from "react";

function NoteState(props) {
  const host='http://localhost:5000';
  const fetchedNotes=[];
  const [myNotes, setmyNotes]=useState(fetchedNotes);
  //Create
  const addNote=async (data)=>{
    try {
      let accessToken=localStorage.getItem("accessToken");
      let response=await fetch(`${host}/api/notes/addNotes`, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          'accessToken': accessToken
        },
        body: JSON.stringify(data)
      });
      const clone=response.clone();
      if(response.ok){
        const res=await response.json();
        setmyNotes(prev => prev.concat(res.notes));
      }
      return clone;
    } 
    catch (error) {
      handleAlert({ heading: "Oops!!", message: "check your network connection or try again later", colour: "yellow" });
    }
  }

  //Read
  const getNotes=async ()=>{
    try {
      let accessToken=localStorage.getItem("accessToken");
      let response=await fetch(`${host}/api/notes/readNotes`, {
        method: "GET",
        headers:{
          'Content-Type': 'application/json',
          'accessToken': accessToken
        }
      });
      const clone=response.clone();
      if(response.ok){
        const res=await response.json();
        setmyNotes(res.notes);
      }
      return clone;
    } 
    catch (error) {
      handleAlert({ heading: "Oops!!", message: "check your network connection or try again later", colour: "yellow" });
    }
  }

  //Update
  const editNote=async (id, data)=>{
    try {
      let accessToken=localStorage.getItem("accessToken");
      let response=await fetch(`${host}/api/notes/updateNotes/${id}`, {
        method: "PUT",
        headers:{
          'Content-Type': 'application/json',
          'accessToken': accessToken
        },
        body: JSON.stringify(data)
      });
      const clone=response.clone();
      if(response.ok){
        setmyNotes(prev => prev.map((element)=>{
          return (element._id === id) ? {...element, ...data} : element
        }));
      }
      return clone;
    } 
    catch (error) {
      handleAlert({ heading: "Oops!!", message: "check your network connection or try again later", colour: "yellow" });
    }
  }

  //Delete
  const deleteNote=async (id)=>{
    try {
      let accessToken=localStorage.getItem("accessToken");
      let response=await fetch(`${host}/api/notes/deleteNotes/${id}`, {
        method: "DELETE",
        headers:{
          'Content-Type': 'application/json',
          'accessToken': accessToken
        }
      });
      const clone=response.clone();
      if(response.ok){
        setmyNotes(prev => prev.filter((element)=>{return (element._id !== id)}));
      }
      return clone;
    } 
    catch (error) {
      handleAlert({ heading: "Oops!!", message: "check your network connection or try again later", colour: "yellow" });
    }
  }
  return (
    <NoteContext.Provider value={{myNotes, setmyNotes, addNote, editNote, deleteNote, getNotes}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;