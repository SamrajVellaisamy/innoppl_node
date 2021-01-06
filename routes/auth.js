var express = require('express');
var router = express.Router();
var Auth = require('../models/authModel');
// var deferred = $q.defer(); 
var jwt = require('jsonwebtoken');
// var bcrypt = require('bcryptjs');
var config = require('./config');
var acToken = require('./token'); 

// const customer = function(customer){

// }



router.post('/userLogin', function(req, res, next) {  
  // res.send('respond with a resource');
  Auth.userlogin({ 
    email : req.body.email,
    password : req.body.password
  },function(err,rows){
    if(err){
      res.json(err);
    }else if(rows.length>0){ 
      rows[0].token = jwt.sign({ id: rows[0].id,email:rows[0].user_email }, config.secret);
      res.cookie(req.body.email,rows[0].token); 
      res.send([{status: res.statusCode, message: res.statusMessage, result: rows[0]}]);
    } else{
      res.send([{status:404, message: "Data not found"}]);

    }
  });
});




  router.post('/logout',acToken.jwtVerify,function (req,res,next) {    

  //     if(verification.status != 200)  {
  //       res.send({status:verification.status,result:'Invalid token'});
  //     } else {
  //       res.clearCookie(verification.result["email"]);
          res.send({status:200,message:"succesfully logged out"}); 
  //     }
  //   });
  });

  //user table
/* POST users listing. */
router.post('/createUser',acToken.auth,function(req,res,next){ 
  Auth.createUser(req.body,function(err,rows){
    if(err) {res.send({status:404,result:err.sqlMessage})
  } else if(rows.affectedRows >= 1) { res.send({status:200,result:'Insert succesfully'}) 
    } 
  });
});

router.post('/getUsers',acToken.auth, function(req, res, next) {  
  Auth.getUsers(req.body,function(err,rows){
      if(err){
        res.json(err);
      }else{
        res.send({status: res.statusCode, message: res.statusMessage, result: rows});
      }
    });
  // }
});
// });

router.post('/updateUsers',acToken.auth,function(req,res,next){ 
  Auth.updateUsers(req.body,function(err,rows){
    if(err) {res.send({status:404,result:err.sqlMessage})
  } else if(rows.affectedRows >= 1) { res.send({status:200,result:'Update succesfully'}) 
    } 
  });
});
  //end user table

  

  router.get('/getauth',acToken.auth,function (req,res) { 
   res.send(req.headers['authorization']);
  });


  //Job Data
  router.post('/createJob',acToken.auth,function(req,res){ 
    Auth.createJob(req.body,function(err,rows){
        if(err) {res.send({status:404,result:err.sqlMessage})
      } else if(rows.affectedRows >= 1) { res.send({status:200,result:'Insert succesfully'}) 
        } 
      }); 
  })

  

  router.post('/viewJob',acToken.auth, function(req, res, next) {  
    Auth.viewJob(req.body,function(err,rows){
         if(err){
           res.json(err);
         }else{
           res.send({status: res.statusCode, message: res.statusMessage, result: rows});
         }
       });
     // }
   });  
 
  router.post('/updateJob',acToken.auth,function(req,res,next){ 
    Auth.updateJob(req.body,function(err,rows){
      if(err) {res.send({status:404,result:err.sqlMessage})
    } else if(rows.affectedRows >= 1) { res.send({status:200,result:'Update succesfully'}) 
      } 
    });
  });
  //End Job data


  //projects Data
  router.post('/CreateProject',acToken.auth,function(req,res){  
    Auth.CreateProject(req.body,function(err,rows){
        if(err) {res.send({status:404,result:err.sqlMessage})
      } else if(rows.affectedRows >= 1) { res.send({status:200,result:'Insert succesfully'}) 
        } 
      }); 
  })

  

  router.post('/viewProject',acToken.auth, function(req, res, next) { 
    Auth.viewProject(req.body,function(err,rows){
         if(err){
           res.json(err);
         }else{
           res.send({status: res.statusCode, message: res.statusMessage, result: rows});
         }
       });
     // }
   });  
 
  router.post('/updateProject',acToken.auth,function(req,res,next){ 
    Auth.updateProject(req.body,function(err,rows){
      if(err) {res.send({status:404,result:err.sqlMessage})
    } else if(rows.affectedRows >= 1) { res.send({status:200,result:'Update succesfully'}) 
      } 
    });
  });
  //End projects data


  //department Data
  router.post('/Createdepartment',acToken.auth,function(req,res){ 
    Auth.Createdepartment(req.body,function(err,rows){
        if(err) {res.send({status:404,result:err.sqlMessage})
      } else if(rows.affectedRows >= 1) { res.send({status:200,result:'Insert succesfully'}) 
        } 
      }); 
  })

  

  router.post('/viewdepartment',acToken.auth, function(req, res, next) { 
    Auth.viewdepartment(req.body,function(err,rows){
         if(err){
           res.json(err);
         }else{
           res.send({status: res.statusCode, message: res.statusMessage, result: rows});
         }
       });
     // }
   });  
 
  router.post('/updatedepartment',acToken.auth,function(req,res,next){ 
    Auth.updatedepartment(req.body,function(err,rows){
      if(err) {res.send({status:404,result:err.sqlMessage})
    } else if(rows.affectedRows >= 1) { res.send({status:200,result:'Update succesfully'}) 
      } 
    });
  });
  //End department data

  // function auth(params,res,next){
  //   var token = (params.headers['authorization']) ? params.headers['authorization'].replace('Bearer ', '') : undefined; 
  //   if (!token) {  res.send({status:401,result:"Token is empty"}); }
  //     jwt.verify(token,config.secret, (err, decoded) => {
  //       if (err) {
  //         res.send({status:500,result:'Please check the token'}); 
  //       } else {
  //         if (params.cookies[decoded["email"]] == token){
  //           // res.send({status:200,result:decoded});
  //           next(); 
  //         } else{
  //           res.send({status:404,result:'Token has been expired'}); 
  //         }
  //       }
  //     });
  // }

  


  // , {
  //   expiresIn: 86400 // expires in 24 hours
  // }





module.exports = router;