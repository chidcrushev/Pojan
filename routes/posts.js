const express        = require('express');
const Router         = express.Router();
const authentication  = require('../auth/middleware/auth-middleware'); 

// Render posts page
Router.get('/',authentication, (req, res, next) => {
 
    res.render('posts/',{
        navBarEnabled: true,
        pageTitle: 'posts',
        info : req.user
    });
});

// Render posts creation page
Router.get('/create',authentication, (req, res, next) => {
    res.render('posts/create',{
        navBarEnabled: true,
        pageTitle: 'create',
        info : req.user
    });
});


// Render posts application page
Router.get('/apply/:postid',authentication, (req, res, next) => {
    res.render('posts/apply',{
        navBarEnabled: true,
        pageTitle: 'apply',
        info : req.user

    });
});

module.exports = Router;

