import {createContext} from "react";

const DataContext = createContext({
    isloggedin:false,
    setisloggedin:()=>{},
    istoken:false,
    setisToken:()=>{}
    

});

export default DataContext;