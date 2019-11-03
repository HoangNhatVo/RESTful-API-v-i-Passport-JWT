const express = require('express');
const router = express.Router();
const mongoose  = require('mongoose');
const User= mongoose.model('User')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(req.user);
});
 router.post('/information',function(req,res,next){
  User.findById(req.body._id)
  .then(user=>{
    user.username = req.body.username
    user.password = req.body.password
    user.avatar = req.body.avatar
    user.save()
    res.send(user)
  })
  .catch(err=>{
    res.send("Không tìm thấy người")
  })
 })

module.exports = router;
