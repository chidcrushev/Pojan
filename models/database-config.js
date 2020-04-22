const mysql = require('mysql');

//Database connection
const db = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root", 
    password: "9500312147sH_",
    database: "project"
})

module.exports= db;