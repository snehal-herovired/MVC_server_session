
/// Hi this component , is used to check for authentication parameters.
//here we are checking for the value of isloggedin state provided
// in Datacontext.

//Scondly any child, in here referring to any component
// we can use this authenticated/protected route like this

import axios  from 'axios'

import React from 'react'
import { useContext,useEffect } from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext';
export default function RequireAuth({children}) {
  let navigate =useNavigate()
  let ctx =useContext(DataContext)
  useEffect(()=>{
    let loggedinState =window.localStorage.getItem("isloggedin")
    let tokenState =window.localStorage.getItem("istoken")
    console.log("this is from useeffect in requireAuth-----",ctx.isloggedin,ctx.istoken);
     if(loggedinState && tokenState){
       navigate('/')
     }
  },[ctx.isloggedin,ctx.istoken])


  return (
    <div>
        {
            ctx.isloggedin ? children :<Navigate to="/login"/> 

}
    </div>
        
  )
}
