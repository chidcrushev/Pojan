const express           = require('express');
const app               = express();
const signInRoute       = require('./signin');
const signUpRoute       = require('./signup');
const signOutRoute      = require('./signout');
const resetRoute        = require('./reset');
const postsRoute        = require('./posts');
const userRoute         = require('./user');
const notificationRoute = require('./notification');
const rootRoute         = require('./root');

/* Register application routes */

app.use('/', rootRoute);
app.use('/signin', signInRoute);
app.use('/signup', signUpRoute);
app.use('/signout', signOutRoute);
app.use('/reset', resetRoute);
app.use('/posts', postsRoute);
app.use('/user', userRoute);
app.use('/notification', notificationRoute);


// Render 404 for non registered routes
app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: '404'});
});

module.exports = app;