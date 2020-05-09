const mysql = require('mysql');

// Database connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "",
    database: "project"
});

// Check if connection is successsful
connection.connect((err) => {
    if (!err) {
        console.log('Successfully connected to MYSQL DB');
    } else {
        console.error('Failed to connect to MYSQL DB');
    }
});

// Generic db query
connection.dbQuery = async ( query, val = null) => {
    return await new Promise((resolve, reject) => {
        connection.query( query, val, (err, rows, fields) => {                                              
            if(rows === undefined){
                reject(new Error(err));
            } else {
                resolve(rows);
            }
        }
    )}
)};

module.exports = connection;