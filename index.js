// Express
const express = require("express");
const app = express();
// Authentication
const session = require("express-session");
const passport = require("passport");
require('./passportConfig')(passport);
// MongoDB database
const mongoose = require('mongoose');
const uri = require('./uri')
async function connectDB() {
    const connected = await mongoose.connect(uri)
    connected ? console.log('Connected to Mongoose MongoDB!') : null
}
connectDB().catch(err => console.log(err))
const User = require('./models/user')

const logger = require('morgan')
const cors = require('cors');
const userRouter = require("./routes/userRouter");


app.use(passport.initialize());
app.use(cors())
app.use(logger('dev'))

app.use(session({
    secret: "secret-key",
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/users', userRouter)




app.listen(3000, () => console.log("Listening on port 3000"))