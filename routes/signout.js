const express   = require('express');
const Router    = express.Router();
const authentication  = require('../auth/middleware/auth-middleware'); 

Router.get('/',authentication, function(req, res){
    req.logout();
    req.session.destroy(function(){
        res.clearCookie('connect.sid');
        res.redirect('signin');
    });
});

module.exports = Router;