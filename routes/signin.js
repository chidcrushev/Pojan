const express   = require('express');
const Router    = express.Router();
const passport  = require('../config/passport-config');
const multer    = require('multer');
const upload    = multer();
const authentication  = require('../auth/middleware/auth-middleware'); 

// Show sign in page
Router.get('/', (req, res) => {
    
    if(req.isAuthenticated()){
        return res.redirect('posts');
    }

    res.render('signin',{
        navBarEnabled: false,
        pageTitle: 'signin'
    });
});
    

// Handle sign in request
Router.post('/', upload.none(), (req, res, next) => {

    passport.authenticate('signin', (err, user, info) => {

        if (err) { 
            res.statusMessage = info.message;
            return res.status(401).send();
        }

        if (!user) { 
            res.statusMessage = info.message;
            return res.status(400).send();
        }

        req.logIn(user, (err) => {
            if (err) { 
                res.statusMessage = err.message;
                return res.status(400).send(); 
            }

            return res.status(200).json({message: 'Redirecting you to the posts page'});
        });
        
    })(req, res, next);
    
}, (err, req, res, next) => {
    // failure in login route
    res.statusMessage = err.message;
    return res.status(400).send();
});

module.exports = Router;
