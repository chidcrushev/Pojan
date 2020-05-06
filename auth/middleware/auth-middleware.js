// global route middleware 
//Prevents the user from routing to different pages without login authentication
let isLoggedIn = (request, response, next) =>{
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect('/');
};

module.exports= isLoggedIn;