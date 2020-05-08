const express   = require('express');
const Router    = express.Router();
const db  = require('../config/database-config');
const authentication = require('../auth/middleware/auth-middleware');


// Render user profile page
Router.get('/profile', authentication, (req, res) => {
    res.render('user/profile', {
        navBarEnabled: true,
        isPageActive: true
    });
});


module.exports = Router;  

 