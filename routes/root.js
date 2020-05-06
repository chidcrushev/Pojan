const express   = require('express');
const Router    = express.Router();

// Render app root
Router.get('/', (req, res) => {

    res.render('signin', {
        navBarEnabled: false,
        pageTitle: 'posts'
    });
    
    // workings
    // check if the user is in session
    // If the user is in session, then redirect to posts/index
    // else redirect to sign in
});

module.exports = Router;

