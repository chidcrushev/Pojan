const express   = require('express');
const app       = express();
const Router    = express.Router();
const db        = require('../models/database-config');


Router.get('/profile', (req, res) => {
    res.render('user/profile', {
        navBarEnabled: true,
        isPageActive: true
    });
});

module.exports = Router;

