var express = require('express');
var router = express.Router();
const mongoose  = require('mongoose');
const User= mongoose.model('User')
/* GET home page. */
router.get('/', function(req, res, next) {
  User.find((err, docs) => {
    if (!err) {
        console.log(docs)
    }
    else {
        console.log('Error in retrieving employee list :' + err);
    }
});
  res.send("get");
});



module.exports = router;
