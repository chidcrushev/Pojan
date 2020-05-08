// global route middleware 
// Prevents the user from routing to different pages without login authentication
let auth = {};

auth.isLoggedIn = async (req, res, next) =>{
    if (await req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

auth.isAdmin = async (req, res, next) => {
    let backURL = req.header('Referer') || '/';
    let isStudent = (req.user) ? req.user.isStudent : false;

    if (isStudent) {
        req.flash('message', 'You are not allowed to create posts');
        return res.redirect(backURL);
    }
    next();
};

module.exports = auth;
