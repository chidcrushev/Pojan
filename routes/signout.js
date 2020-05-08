const express   = require('express');
const Router    = express.Router();
const auth  = require('../auth/middleware/auth-middleware'); 

Router.get('/', auth.isLoggedIn, function(req, res){
    req.logout();
    req.session.destroy(function(){
        res.clearCookie('connect.sid');
        res.redirect('signin');
    });
});

module.exports = Router;