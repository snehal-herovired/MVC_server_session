import React from 'react'
import axios from 'axios'
export default function() {

async function handleclick(){
      let res = await axios.post("http://localhost:5000/user/logout");
      console.log(res);
  }

  return (
    <div>

      <button onClick={handleclick}>Logout</button>
    </div>
  )
}
