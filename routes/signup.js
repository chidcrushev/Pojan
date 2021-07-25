const express   = require('express');
const Router    = express.Router();
const db        = require('../config/database-config');
const multer    = require('multer');
const upload    = multer();
const helpers   = require('../config/helpers');

/**
 * Custom MySql Errors
 */
let sqlErrors = {'1062': {'title': 'Duplicate Entry', 'message': 'Email already exists. Please try again with a different email.'}};

/**
 * Render sign up page
 */
Router.get('/', (req, res, next) => {

    // Prevent the user from vising the login page
    if(req.isAuthenticated())
        return res.redirect('posts/page');

    res.render('signup', {
        pageTitle: 'Sign Up'
    });
});

/**
 * Handle sign up request
 */
Router.post('/', upload.none(), async (req, res, next) => {

    // Get the post data
    let postData = req.body;

    // Validate email address
    helpers.validateEmail(postData.email)
    .then((email) => {
        
        // Cleanup user data
        postData.firstname  = helpers.ucFirst(postData.firstname).trim();
        postData.lastname   = helpers.ucFirst(postData.lastname).trim();
        postData.password   = postData.password.trim();
        postData.avatar     = `/img/profile/avatars/${Math.floor(Math.random() * 5) + 1}.jpg`;
        postData.email      = email.trim();

        // Convert the isStudent data type implicitly
        postData.isStudent  = (postData.isStudent === 'true') ? true : false;

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
                    res.status(200).json({message: 'Your account has been successfully created'});
                }
            });
        }
    }).catch((error) => {
        res.statusMessage = error;
        res.status(400).send();
    });
});

module.exports = Router;

