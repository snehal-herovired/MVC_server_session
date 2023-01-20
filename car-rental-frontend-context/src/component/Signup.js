import React, { useState } from 'react'
import axios from "axios"
import { Navigate,useNavigate } from 'react-router-dom'

export default function Signup() {
    let [userinfo,setUserinfo] = useState({})
    let navigate=useNavigate()



    function handleChange(e){
      setUserinfo((prev)=>({
        ...prev,
        [e.target.name]:e.target.value
      }))
    }
    
   async function handleSubmit(){
      let resdata = await axios.post('http://localhost:5000/user/',{
        username:userinfo.username,
        email:userinfo.email,
        password:userinfo.password
      })
      if(resdata.data){
        console.log(resdata.data);
        alert(`${resdata.data.message}`)
      }
  
      if(resdata.data.register || resdata.data.login){
        navigate("/login")
      }
    }
  return (
    <div>
        <input placeholder='username'name='username' onChange={handleChange}/>
        <input placeholder='email' name='email' onChange={handleChange}/>
        <input placeholder='password' name='password' onChange={handleChange}/>
        {/* <label htmlFor='admin'>Admin</label>
        <input type="radio" id='admin' value="admin" name='admin'onChange={handleChange}/>
        <label htmlFor='student'>student</label>
        <input type="radio" id='student' value="student" name='student'onChange={handleChange}/>
        <label htmlFor='faculty'>faculty</label>
        <input type="radio" id='faculty' value="faculty" name='faculty' onChange={handleChange}/> */}
        <input type='submit' onClick={handleSubmit}/>
        


    </div>
  )
}
