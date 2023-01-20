var session =require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: 'mySessions'
});

module.exports=store;