/* const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const database = require('./database-config');
const query = require('./queries');
const constants = require('./constants');
//To connect the database
module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    // Signup information is inserted/checked with the database using passport module.
    passport.use('signup', new localStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, (request, email, password, done) => {
            database.getConnection(function (error, connection) {
                if (error) {
                    return done(null, false, request.flash(constants.signup, constants.serverError))
                }
                connection.query(query.selectEmail, [email], (error, rows) => {
                    let flag = authenticateEmail(rows);
                    if (flag == false) {
                        //Inserting the new user details to the database
                        let newUser = {
                            email: email,
                            password: bcrypt.hashSync(password, 10),
                            firstName: request.body.first_name,
                            lastName: request.body.last_name,
                            studentId: '800725411', //Need to change 
                            isStudent: true, //Need to change 
                            departmentId: 1, //Need to change
                            contact: '57575710424' //Need to change
                        }
                        connection.query(query.insert, [
                            newUser.departmentId, newUser.firstName, newUser.lastName, newUser.isStudent, newUser.studentId, newUser.email, newUser.password, newUser.contact
                        ], (error, rows) => {
                            let rowId = rows.insertId;
                            return done(null, rowId);
                        })
                    } else {
                        return done(null, false, request.flash(constants.signup, constants.signupError));
                    }
                })
                connection.release();

            })


        }

    ));

    //Signin information is verified with the database using passport module.
    passport.use('signin', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (request, email, password, done) => {

        database.getConnection(function (error, connection) {
            // Error message when the database connection has failed
            if (error) {
                return done(null, false, request.flash(constants.login, constants.serverError))
            }
            connection.query(query.selectEmail, [email],
                (error, rows) => {
                    connection.release();
                    if (rows.length > 0) {
                        let flag = authenticatePassword(rows, password);
                        if (flag == true) {
                            return done(null, rows[0].user_id);
                        } else {
                            return done(null, false, request.flash(constants.login, constants.passwordError));
                        }

                    } else {
                        return done(null, false, request.flash(constants.login, constants.usernameError));
                    }
                })
        })
    }))

}

//To check whether the entered password is correct or not
function authenticatePassword(rows, password) {
    let flag = false;
    if (rows.length > 0) {
        let hashedPassword = rows[0].password;
        if (bcrypt.compareSync(password, hashedPassword)) {
            flag = true;
        }
    }
    return flag;
}

//To check whether the entered email is already taken or not
function authenticateEmail(rows) {
    let flag = false;
    if (rows.length > 0) {
        flag = true;
    }
    return flag;
}
 */