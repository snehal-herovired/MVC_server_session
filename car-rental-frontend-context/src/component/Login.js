import React, { useState,useContext } from 'react'
import DataContext from '../context/DataContext';
import axios from "axios"
import { Link, Navigate,useNavigate } from 'react-router-dom';

export default function Login() {
    const [userdata,setUserData]=useState({})
    const ctx = useContext(DataContext)
    const navigate =useNavigate()

    
    function handleChange(e){
        setUserData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    async function submit(){
    const res =await axios.post("http://localhost:5000/user/verify",{
        email:userdata.email,
        password:userdata.password
    })
    if(!res.data){
        alert("could not login,please try again")
    }
    if(!res.data.login){
        alert("User not registered !! Singup please ")
        navigate("/signup")
    }
    ctx.setisloggedin(res.data.login);
    ctx.setisToken(res.data.token)
    
    navigate('/')

    }
  return (
    <div>
        <input placeholder='email' name='email' onChange={handleChange}/>
        <input placeholder='password'name='password'onChange={handleChange}/>
        <input type="submit" onClick={submit}/>
        <Link to="/">Go to homepage</Link>
    </div>
  )
}
