import React,{useContext,useEffect} from 'react'
import Header from './subcomponent/Header'

import DataContext from '../context/DataContext'
export default function Dashboard() {

  return (
    <div>
        
        <Header/>
        
        <span>This is rendering in Dashboard</span>
        
        
        </div>
  )
}
