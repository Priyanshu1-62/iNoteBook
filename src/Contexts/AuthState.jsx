import AlertContext from "./alertcontext";
import AuthContext from "./authContext";
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AuthState(props) {
  const host='http://localhost:5000';
  const location=useLocation();
  const {handleAlert}=useContext(AlertContext);
  const [isAuthorized, setIsAuthorized]=useState(false);
  const [isLoading, setIsLoading]=useState(true);
  const navigate=useNavigate();
  let accessToken;
  //SignUp
  const signup = async (data)=>{
    try {
      const response=await fetch(`${host}/api/auth/createUser`, {
        method: "POST",
        credentials: "include",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify(data)
      });
      const clone=response.clone();
      if(response.ok){
        const res=await response.json();
        accessToken=res.accessToken;
        localStorage.setItem("accessToken", accessToken);
        handleAlert({ heading: "Success", message: "Account created successfully!", colour: "green" });
        setIsAuthorized(true);
      }
      else{
        const res=await response.json();
        if(response.status===500) handleAlert({ heading: "Oops!!", message: res.errors, colour: "yellow" });
        else handleAlert({ heading: "Invalid Input", message: res.errors, colour: "red" });
      }
      return clone;
    } 
    catch (error) {
      handleAlert({ heading: "Oops!!", message: "check your network connection or try again later", colour: "yellow" });
    }
  }

  //Login
  const login = async (data)=>{
    try {
      const response=await fetch(`${host}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify(data)
      });
      const clone=response.clone();
      if(response.ok){
        const res=await response.json();
        accessToken=res.accessToken;
        localStorage.setItem("accessToken", accessToken);
        handleAlert({ heading: "Success", message: "Logged in Successfully!", colour: "green" });
        setIsAuthorized(true);
      }
      else{
        const res=await response.json();
        if(response.status===500) handleAlert({ heading: "Oops!!", message: res.errors, colour: "yellow" });
        else handleAlert({ heading: "Invalid Credentials", message: res.errors, colour: "red" });
      }
      return clone;
    } 
    catch (error) {
      handleAlert({ heading: "Oops!!", message: "check your network connection or try again later", colour: "yellow" });
    }
  }

  //Refresh the access token
  const refresh = async ()=>{
    try {
      const response=await fetch(`${host}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers:{
          "Content-Type": "application/json"
        }
      });
      const clone=response.clone();
      if(response.ok){
        const res=await response.json();
        accessToken=res.accessToken;
        localStorage.setItem("accessToken", accessToken);
        setIsAuthorized(true);
      }
      else{
        const res=await response.json();
        if(response.status===500) handleAlert({ heading: "Oops!!", message: res.errors, colour: "yellow" });
        else handleAlert({ heading: "Unauthorized !!", message: "Please Signup/login to continue", colour: "red" });
        setIsAuthorized(false);
      }
      return clone;
    } 
    catch (error) {
      handleAlert({ heading: "Oops!!", message: "check your network connection or try again later", colour: "yellow" });
    }
  }

  //Logout
  const logout = async ()=>{
    try {
      const response=await fetch(`${host}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers:{
          "Content-Type": "application/json"
        }
      });
      const clone=response.clone();
      if(response.ok){
        handleAlert({ heading: "Success", message: "Logout Successful", colour: "green" });
      }
      setIsAuthorized(false);
      localStorage.removeItem("accessToken");
      navigate('/auth');
      return clone;
    } 
    catch (error) {
      handleAlert({ heading: "Oops!!", message: "check your network connection or try again later", colour: "yellow" });
    }
  }

  //Rememberme
  const rememberMe = async ()=>{
    try {
      const response=await fetch(`${host}/api/auth/rememberme`, {
        method: "POST",
        credentials: "include",
        headers:{
          "Content-Type": "application/json"
        }
      });
      const clone=response.clone();
      if(response.ok){
        handleAlert({ heading: "Hii", message: "We still remember you :)", colour: "green" });
        setIsAuthorized(true);
      }
      else{
        setIsAuthorized(false);
      }
      return clone;
    } 
    catch (error) {
      handleAlert({ heading: "Oops!!", message: "check your network connection or try again later", colour: "yellow" });
    }
  }
  //Page refresh
  const pageRefresh = async ()=>{
    try {
      setIsLoading(true);
      let token=localStorage.getItem("accessToken");
      if(token){
        setIsAuthorized(true);
      }
      else{
        await refresh();
      }
      setIsLoading(false);
    } 
    catch (error) {
      handleAlert({ heading: "Oops!!", message: "check your network connection or try again later", colour: "yellow" });
    }
  }
  useEffect(()=>{
    if(location.pathname!=="/" && location.pathname!=="/auth"){
      pageRefresh();
    }
  }, []);
  return (
    <AuthContext.Provider value={{isLoading, isAuthorized, signup, login, refresh, logout, rememberMe}}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;