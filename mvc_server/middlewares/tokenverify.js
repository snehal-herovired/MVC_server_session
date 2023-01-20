const jwt = require('jsonwebtoken');

async function verifyToken(req,res,next){
    if(req.session.userid){
        console.log(req.session.userid);
        next()

    }else{

        res.status(400).json({
            message:"authentication failed",
            token:false,
            login:false
        })
    }
    

}


module.exports=verifyToken;