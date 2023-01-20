const express = require('express')
const routes =express.Router();
const {getUser,verifyUser,fetchUser,logout} = require('../controllers/userController')
const verifyToken = require('../middlewares/tokenverify')


routes.post('/',getUser)
routes.post('/verify',verifyUser)
routes.get('/user',verifyToken,fetchUser)
routes.post('/logout',logout)








module.exports ={
    routes
}