const express       = require('express');
const Router        = express.Router();
const authetication = require('../auth/middleware/auth-middleware'); 

Router.get('/',authetication, (req, res) => {
    res.render('notification');
});

module.exports = Router;

