const express       = require('express');
const Router        = express.Router();
const auth = require('../auth/middleware/auth-middleware'); 

Router.get('/',auth.isLoggedIn, (req, res) => {
    res.render('notification');
});

module.exports = Router;

