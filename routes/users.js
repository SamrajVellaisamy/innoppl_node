var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
// var deferred = $q.defer(); 

/* GET users listing. */
router.get('/getAllUsers', function(req, res, next) {
  // res.send('respond with a resource');
  User.getAllUsers(function(err,rows){
    if(err){
      res.json(err);
    }else{
      res.json(rows);
    }
  });
});

router.get('/:id?', function(req, res, next) {
  // res.send('respond with a resource');
  if(req.params.id){
      User.getUsersById(req.params.id,function(err,rows){
        if(err){
          res.json(err.status(HttpStatus.BAD_REQUEST).send('error response'));
        }else{
          console.log(rows[0].count);
          res.send([{status: res.statusCode, id: req.body.id,count: rows[0].count, result: rows}]);
        } 
      });
  }else{
      // res.json([{message: '',status: 404}]);
      res.json(res.status(200).send('respond with a resource'));
  }
});



module.exports = router;
