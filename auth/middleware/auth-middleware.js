// global route middleware 
//Prevents the user from routing to different pages without login authentication
let isLoggedIn = (req, res, next) =>{
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

module.exports= isLoggedIn; 