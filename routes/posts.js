const express        = require('express');
const Router         = express.Router();
const authetication  = require('../auth/middleware/auth-middleware'); 

// Render posts page
Router.get('/',authetication, (req, res, next) => {
    res.render('posts/',{
        navBarEnabled: true,
        pageTitle: 'posts'
    });
});

// Render posts creation page
Router.get('/create',authetication, (req, res, next) => {
    res.render('posts/create',{
        navBarEnabled: true,
        pageTitle: 'create'
    });
});


// Render posts application page
Router.get('/apply/:postid',authetication, (req, res, next) => {
    res.render('posts/apply',{
        navBarEnabled: true,
        pageTitle: 'apply'
    });
});

module.exports = Router;

