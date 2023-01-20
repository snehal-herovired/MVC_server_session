const bcrypt = require('bcrypt');
const User = require('../modals/userSchema');
const jwt = require('jsonwebtoken')





async function getUser(req, res) {
    const { username, email, password } = req.body;
    
    let userExists;
    try {
        userExists = await User.findOne({ 'email': email })
        if (userExists) {
            return res.json({
                message: "user already exists!proceed with login",
                register: false,
                login:true
            })
        }
        const password_hasing = bcrypt.hashSync(password, 5);
        const user = new User({
            username,
            email,
            password: password_hasing
        })
        await user.save();
        return res.status(200).json({
            message: "signup successfull",
            register: true
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error.message,
            register: false
        })
    }
}


async function verifyUser(req, res) {
    const { email, password } = req.body;
    
    let userExists;
    try {
        userExists = await User.findOne({ 'email': email });
    } catch (error) {
       return console.log(error);
    }
    if (!userExists) {
        return res.status(400).json({
            message: "login unsuccessfull",
            login: false,
            'email': false
        })
    }


    const hashedPassword = userExists.password
    const verified = bcrypt.compareSync(password, hashedPassword);
    console.log(verified,"----------------------------------------");

    if (!verified) {
        return res.status(400).json({
            message: "login unsuccessfull",
            login: false,
            password: false
        })

    }
    
    req.session.regenerate(function(err){
        if(err) throw (err);

        req.session.userid=`${userExists._id}`

        req.session.save(function(err){
            if(err) throw (err);
            return res.status(200).json({
                message: "login successfull",
                login: true,
                token:true
            })
        })
    })
    

       
    
    
   

}

async function fetchUser(req,res){
    const userid = req.session.userid
   
    try {
        const userInfo = await User.findById(userid);

        if(!userInfo){
         return res.status(400).json({
            message:"no user",
            auth:false,
            token:false
         })
        }

        return res.json({
            token:true,
            login:true,
            data:userInfo,
            message:"authenticted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:"user does not exists",
            token:false,
            login:false
        })
    }
   

}

async function logout(req,res){
   req.session.destroy((err)=>{
    if(err) throw(err);
    res.json({
        message:"logged out",
        login:false,
        token:false
    })
   })
}
module.exports = {
    getUser,
    verifyUser,
   fetchUser,
   logout
}