var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose  = require('mongoose');
const User= mongoose.model('User')

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            res.send(user)
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, 'your_jwt_secret');
           return res.json({user, token});
        });
    })(req, res);
});

router.post('/register',(req,res)=>{
    res.send(req.body);
    var user = new User();
    user.username= req.body.username;
    user.password=req.body.password;
    user.save(err=>{
      if(err)
      console.log("save error");
    })
  })

router.get('/google',passport.authenticate('google',{
    scope: ['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.send("you loggin google")
});
module.exports = router;