var mysql = require("mysql");
var dbconfig = require("../config/database.config");

var connection = mysql.createPool({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database
});

// open the MySQL connection
connection.getConnection(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;