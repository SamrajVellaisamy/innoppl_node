var db = require('./database');

var Users = {
    userlogin: function (req, callback) {
        let sql = "Select * from user where user_email=? and password=?";
        return db.query(sql, [req.email, req.password], callback);
        // db.end();
    },

    createUser: function (req, callback) {
        let value = req;
        let values = [];

        req.forEach(data => {
            values.push([data.username, data.user_email, data.password]);
        });

        var sql = "INSERT INTO `user` (`username`, `user_email`, `password`) VALUES ?";
        db.query(sql, [values], callback); 

    },

    getUsers: function (req, callback) {
        let str = '';
        let key = '';
        if (req.length != null) {
            key = Object.keys(req[0]);
            str = str.concat(' where ');
        } else {
            key = [];
        }

        key.forEach((data) => {
            switch (data) {
                case 'id':
                    str = str.concat(data) + '=' + "'" + req[0].id + "'" + ' AND ';
                    break;
                
                case 'username':
                    str = str.concat(data) + '=' + "'" + req[0].username + "'" + ' AND ';
                    break;
                case 'user_email':
                    str = str.concat(data) + '=' + "'" + req[0].user_email + "'" + ' AND ';
                    break;
                 
                case 'active':
                    str = str.concat(data) + '=' + "'" + req[0].active + "'" + ' AND ';
                    break;
                
                default:
                    str = 'AND';
                    break;

            }
        });

        console.log(str);
        let sql = "SELECT id,username,user_email,user_dob,active FROM user " + str.slice(0, -4);
        return db.query(sql, callback);
    },

    updateUsers: function (req, callback) {
        console.log(req);
        let values = [];
        req.forEach(data => {
            values.push(data.username, data.user_email, data.password, data.user_dob, data.active, data.delete_details, data.id);
        });
        let sql = "update user set username=?,user_email=?,password=?,user_dob=?,active=?,delete_details=? where id=?";
        return db.query(sql, values, callback);
    },

    // Job table
    createJob: function (req, callback) {
        let values = [];
        req.forEach(data => {
            values.push([data.employee, data.department, data.project]);
        });
        var sql = "INSERT INTO `job`(`employee`, `department`, `project`) VALUES ?";
        db.query(sql, [values], callback);
    },

    viewJob: function (req, callback) {
        let str = '';
        let key = '';
        if (req.length != null) { 
            key = Object.keys(req[0]);
            str = str.concat(' where ');
        } else {
            key = [];
        }
        key.forEach((data) => { 
            switch (data) {
                case 'id':
                    str = str.concat('j.' + data) + '=' + "'" + req[0][data] + "'" + ' AND ';
                    break;
                case 'department':
                     if(req[0][data])
                        str = str.concat('j.' + data) + '=' + "'" + req[0][data] + "'" + ' AND ';
                    break;
                case 'project':
                        if(req[0][data])
                            str = str.concat('j.' + data) + '=' + "'" + req[0][data] + "'" + ' AND ';
                    break;
                // case 'event_date':
                //     str = str.concat(data) + req[0].event_date.split(' ')[0] + "'" + req[0].event_date.split(/ (.+)/)[1] + "'" + ' AND ';
                //     break;

                default:
                    str = 'AND ';
                    break;

            }
        });
        let sql = "Select j.*,d.department as dept_name,d.id as dept_id,p.project as project,p.id as project_id, u.username as employee_name from job j left join department d on d.id = j.department left join project p on p.id = j.project left join user as u on u.id = j.employee" + str;
        // .slice(0, -4); 
        // text = 'Something -that - has- dashes - World';
        sql = sql.split(' '); 
        sql = sql.splice(0,sql.length-2).join(' ');
        return db.query(sql, callback);
    },

    updateJob: function (req, callback) {
        console.log(req);
        let values = [];
        req.forEach(data => {
            values.push(data.link, data.event_date, data.event_key, data.event_invalid, data.id);
        });
        let sql = "update job set employee=?,department=?,project=?,description=? where id=?";
        return db.query(sql, values, callback);
    }, 

    //Project Table

    CreateProject: function (req, callback) {
        let values = [];
        req.forEach(data => {
            values.push([data.project]);
        });
        var sql = "INSERT INTO `project`(`project`) VALUES ?";
        db.query(sql, [values], callback);
    },
    viewProject: function (req, callback) {
        let str = '';
        let key = '';
        if (req.length != null) {
            key = Object.keys(req[0]);
            str = str.concat(' where ');
        } else {
            key = [];
        }

        key.forEach((data) => {
            switch (data) {
                case 'id':
                    str = str.concat(data) + '=' + "'" + req[0][data] + "'" + ' AND ';
                    break;
                case 'project':
                    str = str.concat(data) + '=' + "'" + req[0][data] + "'" + ' AND ';
                    break;
                default:
                    str = 'AND';
                    break;

            }
        });

        let sql = "Select * from project " + str.slice(0, -4);
        return db.query(sql, callback);
    },

    updateProject: function (req, callback) {
        let values = [];
        req.forEach(data => {
            values.push(data.user_id, data.event_id, data.event_date, data.status, data.id);
        });
        let sql = "update project set project=? where id=?";
        return db.query(sql, values, callback);
    },
// End project table

//Project Table

Createdepartment: function (req, callback) {
    let values = [];
    req.forEach(data => {
        values.push([data.department]);
    });
    var sql = "INSERT INTO `department`(`department`) VALUES ?";
    db.query(sql, [values], callback);
},
viewdepartment: function (req, callback) {
    let str = '';
    let key = '';
    if (req.length != null) {
        key = Object.keys(req[0]);
        str = str.concat(' where ');
    } else {
        key = [];
    }

    key.forEach((data) => {
        switch (data) {
            case 'id':
                str = str.concat(data) + '=' + "'" + req[0][data] + "'" + ' AND ';
                break;
            case 'department':
                str = str.concat(data) + '=' + "'" + req[0][data] + "'" + ' AND ';
                break;
            default:
                str = 'AND';
                break;

        }
    });

    let sql = "Select * from department " + str.slice(0, -4);
    return db.query(sql, callback);
},

updatedepartment: function (req, callback) {
    let values = [];
    req.forEach(data => {
        values.push(data.department);
    });
    let sql = "update department set department=? where id=?";
    return db.query(sql, values, callback);
},
};
// End department table

function jsonTopost(req) {
    let key = Object.keys(req);
    let keys = [];
    key.forEach((data, i) => {
        keys += "`" + data + "`= '" + req[data] + "'";
        if (i != key.length - 1) keys += " AND ";
    });
    console.log(keys);
    return keys;
    // console.log(keys);
    // return values;
    // let t = JSON.stringify(data).replace(/:/g,'=').replace(/,/g,' AND ').replace(/[{()}]/g,'').replace(/"/g,'');
    // console.log(data.split(""));
}
 

module.exports = Users;