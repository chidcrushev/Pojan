const express       = require('express');
const Router        = express.Router();
const authentication = require('../auth/middleware/auth-middleware'); 

Router.get('/',authentication, (req, res) => {
    res.render('notification');
});

module.exports = Router;

