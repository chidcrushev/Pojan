const path      = require('path');
const express   = require('express');
const app       = express();
const Router    = express.Router();
const db        = require('../models/database-config');


Router.get('/', (req, res, next) => {
    res.render('posts/',{
        navBarEnabled: true,
        pageTitle: 'posts'
    });
});

Router.get('/create', (req, res, next) => {
    res.render('posts/create',{
        navBarEnabled: true,
        pageTitle: 'create'
    });
});

Router.get('/apply/:postid', (req, res, next) => {
    res.render('posts/apply',{
        navBarEnabled: true,
        pageTitle: 'apply'
    });
});

module.exports = Router;

