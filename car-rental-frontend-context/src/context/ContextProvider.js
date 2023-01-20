import React, { useContext, useEffect, useState } from 'react'
import DataContext from './DataContext'
export default function ContextProvider({ children }) {
  let ctx = useContext(DataContext);
  const [auth, setAuth] = useState(false)
  const [token, setToken] = useState(false)
 
  return (
    <DataContext.Provider value={{
      isloggedin: auth,
      setisloggedin: (value) => {
        setAuth(value)
      },
      istoken: token,
      setisToken: (value) => {
        setToken(value)
      }
    }}>
      {children}
    </DataContext.Provider>
  )
}
