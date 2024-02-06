const express = require('express');
const passport = require('passport')
const userRouter = express.Router();
const User = require('../models/user')


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/habits')
}

userRouter.get('/habits', (req, res) => {
    res.send(defaultHabitList)
} )


const defaultHabitList = [
    "Win",
    "Win",
    "Win",
    "No matter what"
  ];

userRouter.post('/register', function(req, res, next) {
    console.log('registering user');
    User.register(new User({username: req.body.username}), req.body.password, function(err) {
      if (err) {
        console.log('error while registering user!', err);
        return next(err);
      }
  
      console.log('user registered!');
      passport.authenticate()
      res.send("Registration Successful!");
    });
});

userRouter.post('/login', passport.authenticate('local'), function(req, res) {
    res.send("Login Successful!");
});


module.exports = userRouter;