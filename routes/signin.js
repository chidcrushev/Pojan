const express   = require('express');
const app       = express();
const Router    = express.Router();
const db        = require('../models/database-config');


Router.get('/', (req, res) => {
    res.render('signin',{
        pageTitle: 'Sign In'
    });
});

module.exports = Router;

