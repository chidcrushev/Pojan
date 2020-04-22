/**
 * @author Chidambaram Crushev, Valentine Aduaka
 */
const express = require('express');
const path = require('path');
const router = express.Router();
const projectDirectory = path.join(__dirname, '../public');


module.exports = function (app, passport) {
    //Retrieves the signin page initially
    app.get('/', (request, response, next) => {
        response.render('signin', {
            layout: false
        });
    });

    //Retrieves the reset page.
    app.get('/reset', (request, response, next) => {
        response.render('reset', {
            layout: false
        })
    })

    //Retrieves the signup page.
    app.get('/signup', (request, response, next) => {
        response.render('signup', {
            layout: false,
            message: request.flash('signupMessage')
        })
    })

    //Retrieves the signin page.
    app.get('/signin', (request, response, next) => {
        response.render('signin', {
            layout: false,
            message: request.flash('loginMessage')
        })
    })
    //Retrieves the signin page.
    app.get('/apply', (request, response, next) => {
        response.render('apply', {
            layout: false,
        })
    })

    //Retrieves the create page.
    app.get('/create', (request, response, next) => {
        response.render('create', {
            layout: false,
        })
    })

    //Retrieves the dashboard page.
    app.get('/dashboard', (request, response, next) => {
        response.render('dashboard', {
            layout: false,
            message: request.flash('loginMessage')
        })
    })

    //Retrieves the notification page.
    app.get('/notification', (request, response, next) => {
        response.render('notification', {
            layout: false,
            message: request.flash('loginMessage')
        })
    })

    //Retrieves the profile page.
    app.get('/profile', (request, response, next) => {
        response.render('profile', {
            layout: false,
            message: request.flash('loginMessage')
        })
    })

    //Route to sign in page after signing up
    app.post('/submit', passport.authenticate('signup', {
        successRedirect: '/signin',
        failureRedirect: '/signup', 
        failureFlash:true
    }), )

    //Authenticating the user login details
    app.post('/login', passport.authenticate('signin', {
        successRedirect: '/dashboard', //Need to change
        failureRedirect: '/signin',
        failureFlash: true
    }))

    //Route to dashboard page after signing in 
    app.get('/dashboard', (request,response, next)=>{
        response.render('dashboard', {
            layout:false,
        })
    })
}
