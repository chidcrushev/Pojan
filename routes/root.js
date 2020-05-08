const express   = require('express');
const Router    = express.Router();

// Render app root
Router.get('/', (req, res) => {

    //Prevent the user from vising the login page
    if(req.isAuthenticated()){
        return res.redirect('posts');
    }

    res.render('signin', {
        navBarEnabled: false,
        pageTitle: 'Sign In'
    });
});

module.exports = Router;

