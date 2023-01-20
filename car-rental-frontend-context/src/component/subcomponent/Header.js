import React,{useContext} from 'react'
import Logout from '../Logout'
import Login from '../Login'
import DataContext from '../../context/DataContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function Header() {
   let ctx = useContext(DataContext)
   console.log(ctx,"coming from header");
   async function handleclick(){
    let res = await axios.post("http://localhost:5000/user/logout");
  if(!res.data.login && !res.data.token){
    ctx.setisToken(res.data.token);
    ctx.setisloggedin(res.data.login)
  }
}

  return (
    <div style={{backgroundColor:"lightblue"}}>
        <span>this is header</span>
        {
            ctx.isloggedin ? <button onClick={handleclick}>Logout</button> : <Link to="/signup">Signup</Link>

        }
        
        
    </div>
  )
}
