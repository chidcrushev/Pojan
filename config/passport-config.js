const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const db  = require('../config/database-config');
const helpers  = require('../config/helpers');

/**
 * Establish and maintained session via a cookie set in the user's browser.
 */
passport.serializeUser( (user, done) => {
    done(null, user);
});

/**
 * 
 */
passport.deserializeUser(function (user, done) {
    db.query('SELECT * FROM user where user_id = ?', [user.id], (error, rows, fields) => {
        done(null,rows[0]);
    });
});

/**
 * Handle user's sign in
 */
passport.use('signin', new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    // session: false
}, (request, email, password, done) => {

        db.query('SELECT * FROM user where email = ?', [email.trim()], (error, rows, fields) => {

            if (rows.length > 0) {
                let flag = comparePassword(rows, password.trim());

                if ( flag === true )
                    return done(null, {id: rows[0].user_id});
                 else 
                    return done(null, false, { message: 'Your password is incorrect.' });
                
            } else {
                return done(null, false, { message: 'That email doesn\'t exist. Please check and try again.' });
            }
        });
    }
));

/**
 * To check whether the entered password is correct or not
 * @param {*} rows 
 * @param {*} password 
 * @returns 
 */
const comparePassword = (rows, password) => {

    if (rows.length > 0) {
        const hashedPassword = rows[0].password;
        
        if (helpers.hash(password) === hashedPassword)
            return true;
    }
};

module.exports = passport;