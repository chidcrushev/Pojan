const express   = require('express');
const Router    = express.Router();

// Render posts page
Router.get('/', (req, res, next) => {
    res.render('posts/',{
        navBarEnabled: true,
        pageTitle: 'posts'
    });
});

// Render posts creation page
Router.get('/create', (req, res, next) => {
    res.render('posts/create',{
        navBarEnabled: true,
        pageTitle: 'create'
    });
});


// Render posts application page
Router.get('/apply/:postid', (req, res, next) => {
    res.render('posts/apply',{
        navBarEnabled: true,
        pageTitle: 'apply'
    });
});

module.exports = Router;

