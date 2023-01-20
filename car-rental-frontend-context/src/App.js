
import './App.css';
import Dashboard from './component/Dashboard';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from './component/Login';
import Logout from './component/Logout';
import Signup from './component/Signup';
import DataContext from './context/DataContext';

import LandingPage from './component/LandingPage';
import axios from 'axios';

//component used for authenticated rendering of component
import RequireAuth from './component/authcomponent/RequireAuth';
import { useContext, useEffect } from 'react';
axios.defaults.withCredentials = true
function App() {
  const ctx =useContext(DataContext)


  useEffect(() => {

    ctx.setisToken(window.localStorage.getItem('isloggedin'));
    ctx.setisloggedin(window.localStorage.getItem('istoken'))
  }, [])
  
  useEffect(()=>{
    window.localStorage.setItem('isloggedin',ctx.isloggedin)
    window.localStorage.setItem('istoken',ctx.istoken)
  },[ctx.isloggedin,ctx.istoken])
  
 console.log("from app",ctx.isloggedin,ctx.istoken);

 useEffect(()=>{
  const fetchUser =async()=>{
    try {
      
      const res =await axios.get('http://localhost:5000/user/user');
      console.log(res.data);
      if(res.data.login && res.data.token){

        ctx.setisloggedin(res.data.login);
        ctx.setisToken(res.data.token)
      }
    } catch (error) {
   console.log(error);
   ctx.setisloggedin(false);
   ctx.setisToken(false);
      
    }
  }
  fetchUser()
},[ctx.isloggedin,ctx.istoken])
 
  return (
    <Router>
      <Routes>
        
          <Route path='/' element={
            <RequireAuth>
              <Dashboard/>
            </RequireAuth>
          }/>:
          {/* <Route path="/home" element={<LandingPage/>}/> */}
        
        <Route path='/login' element={<Login/>}/>
        
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
