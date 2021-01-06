var db = require('./database');

var Users = {
    getAllUsers: function(callback){
        let sql = "Select * from user";
        return db.query(sql, callback);
        db.end();
    },
    getUsersById: function(id,callback){
        let sql = "Select *, count(*) as count from user where id=?";
        return db.query(sql,[id],callback);
        // db.end();
    }
};
    
module.exports = Users;