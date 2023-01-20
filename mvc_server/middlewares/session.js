const store =require("../database/sessionStore")
let expiresIn =1000*60*60*24;
let sessionInfo ={
   
    secret:"diggidon",
    resave: false,
    store:store,
  saveUninitialized: true,
  cookie:{
    secure:false,
    maxAge:expiresIn,
    httpOnly:true,
  }
}


module.exports =sessionInfo;