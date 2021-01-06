var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config'); 
const { hash } = require('bcryptjs');

// const { use } = require('./users'

var token = {

    jwtVerify: function (params,res,next) {
        var token = (params.headers['authorization']) ? params.headers['authorization'].replace('Bearer ', '') : undefined;
        if (!token) { res.send({ status: 401, result: "Token is empty" }); } 
        jwt.verify(token, config.secret, (err, decoded) => {  
                if (err) {
                    res.send(err)
                } else {
                  next();
                }
          });
    },

    auth: function (params, res, next) {
        var token = (params.headers['authorization']) ? params.headers['authorization'].replace('Bearer ', '') : undefined;
        if (!token) { res.send({ status: 401, result: "Token is empty" }); }
        
        jwt.verify(token, config.secret , (err, user) => {
            console.log(user)
            if (err) return res.sendStatus(403)
           else 
           //res.send({status:200,result:user})
           next();
          })
    },
    createKey: function(req,callback){ 
        console.log(req);
        req.forEach((res)=>{
        let d = new Date().toDateString(); 
        let re = /\./gi; 
        res.event_key =  bcrypt.hashSync(d).replace(/[/.*+\-?^${}()|[\]\\]/g, '').slice(-20);  
        })
        callback(req);
        
    },   

}

module.exports = token;