var db = require('./database'); 

var Users = {
    userlogin: function(req,callback){  
        let sql = "Select * from user where user_email=? and password=?";
        return db.query(sql,[req.email,req.password], callback);
        // db.end();
    },
    getUsersById: function(req,callback){
        let sql = "Select username,user_email,user_dob, count(*) as count from user where id=?";
        return db.query(sql,[req.userid],callback);
        // db.end();
    },
    getAllusers: function(req,callback){
        let sql = "select username,user_email,user_dob from user";
        return db.query(sql,callback);
    },
    createUser:function(req,callback){;
    //     req.forEach(data => {
    //         console.log(data.name); 
    //         values.push([data.name,data.email,data.password,data.dob]);
    //     });   
          var sql = "INSERT INTO `user` ("+keyGet(req)+") VALUES ?"; 
    //   var sql = "INSERT INTO `user` (`username`, `user_email`, `password`, `user_dob`) VALUES ?";
    // console.log(db.query(sql,[postDataSplit(req).replace(/\\/g,'')]));
    console.log([postDataSplit(req)])
      db.query(sql,[postDataSplit(req)],callback);
  },


  // Event table
  createEvent:function(req,callback){ 
    let values = [];
    req.forEach(data => { 
        values.push([data.link,data.event_date,data.event_key]);
    });   
  var sql = "INSERT INTO `events`(`link`, `event_date`, `event_key`) VALUES ?";
  db.query(sql, [values],callback);
},
};

function postDataSplit(req) {
    let values = [];
    let key = Object.keys(req[0]);
    req.forEach((data,j,arr) => {   
        for(let i=0; i < key.length;i++){
            if(i == 0) values += '[';
            values += "'"+data[key[i]]+"'";
            if(i != key.length-1){values +=',';}
            if(i == key.length-1) values +=']';   
        }
        if(j != arr.length-1) { values +=','; }; 
    });     
    // console.log(values);
    return values;
}

function keyGet(req){
    let key = Object.keys(req[0]);
    let keys=[];
    key.forEach((data,i)=>{
         keys += "`"+data+"`";
        if(i != key.length-1) keys += ",";   
    });   
    return keys;
}


module.exports = Users;