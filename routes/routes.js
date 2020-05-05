const express           = require('express');
const app               = express();
const signInRoute       = require('./signin');
const signUpRoute       = require('./signup');
const resetRoute        = require('./reset');
const postsRoute        = require('./posts');
const userRoute         = require('./user');
const notificationRoute = require('./notification');
const rootRoute         = require('./root');


app.use('/', rootRoute);
app.use('/signin', signInRoute);
app.use('/signup', signUpRoute);
app.use('/reset', resetRoute);
app.use('/posts', postsRoute);
app.use('/user', userRoute);
app.use('/notification', notificationRoute);

app.use(function(req, res, next){
    res.status(404).render('404', {pageTitle: '404'});
});

module.exports = app;