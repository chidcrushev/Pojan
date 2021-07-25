const mysql = require('mysql');


/**
 * DB Connection Setup
 */
const connection = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "",
    database: "project",
    multipleStatements: true
});

/**
 * Connect to database
 */
connection.connect((err) => {
    if (!err) {
        console.log('Successfully connected to MYSQL DB');
    } else {
        console.error('Failed to connect to MYSQL DB \nPlease make sure you provided your mysql password');
    }
});

/**
 * DB Query setup
 */
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