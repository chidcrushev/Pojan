const express   = require('express');
const Router    = express.Router();
const db        = require('../config/database-config');
const multer    = require('multer');
const upload    = multer();
const helpers   = require('../config/helpers');
const flash = require('connect-flash');

// Custom MySql Errors
let sqlErrors = {'1062': {'title': 'Duplicate Entry', 'message': 'Email already exists. Please try again with a different email.'}};

// Render sign up page
Router.get('/', (req, res, next) => {
    res.render('signup', {
        pageTitle: 'Sign Up'
    });
});

// Handle sign up request
Router.post('/', upload.none(), (req, res, next) => {

    let postData = req.body;

    // Convert the isStudent data type implicitly
    if (postData.isStudent === 'true') {
        postData.isStudent = true;
    } else {
        postData.isStudent = false;
    }

    // Hash the password
    let hashedPassword = helpers.hash(postData.password);

    if (hashedPassword) {

        // Replaced password with hashed
        postData.password = hashedPassword;

        // Insert new user's data into the database
        db.query('INSERT INTO user SET ?', postData, (error, results, fields) => {
            if (error) {
                res.statusMessage = sqlErrors[error.errno].message;
                res.status(400).send();
            } else {
                req.flash('info', 'Flash is back!')
                res.status(200).json({message: 'Your account has been successfully created'});
            }
        });
    }
});

module.exports = Router;

