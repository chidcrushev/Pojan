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

module.exports = connection;