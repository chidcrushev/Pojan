const express   = require('express');
const app       = express();
const Router    = express.Router();
const db        = require('../models/database-config');


Router.get('/', (req, res) => {

    res.render('posts/', {
        navBarEnabled: true,
        pageTitle: 'posts'
    });
    
    // workings
    // check if the user is in session
    // If the user is in session, then redirect to posts/index
    // else redirect to sign in
});

module.exports = Router;

