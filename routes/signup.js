const express   = require('express');
const app       = express();
const Router    = express.Router();
const db        = require('../models/database-config');


Router.get('/', (req, res, next) => {
    res.render('signup', {
        pageTitle: 'Sign Up'
    });
});

module.exports = Router;

