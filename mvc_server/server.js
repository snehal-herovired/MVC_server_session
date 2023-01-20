// main server file
require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bp = require('body-parser')
const session = require('express-session');

const Port = process.env.PORT || 5000
const app = express();
// loading the dependencies in application
app.use(morgan());
app.use(helmet());
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}));
app.use(express.json());
app.use(bp.urlencoded({ extended: true }))
app.use(express.static(__dirname))


//connecting to mongo server
const dbconnect = require("./database/db")
async function connection() {
    let res = await dbconnect()
    if (res) {
        console.log("mongo db connnected");
    }
}
connection()

// ***********Session Store connection **************************

const store = require("./database/sessionStore");
store.on('error', function (error) {
    console.log(error);
});

//loading session data -------------------------------------
const sessionInfo = require('./middlewares/session')
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sessionInfo.cookie.secure = true // serve secure cookies
}
app.use(session(sessionInfo));

//loading Apis----------------------------------------------
const { routes } = require("./routes/userRouter");

app.use("/user", routes)


//
app.listen(Port, () => {
    console.log(`Application running on port ${Port}`);
})

