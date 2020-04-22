/**
 * @author Chidambaram Crushev, Valentine Aduaka
*/

//Dependencies
const express     = require('express');
const path        = require('path');
const app         = express();
const http        = require('http').createServer(app);
const io          = require('socket.io')(http);
const body_parser = require('body-parser');
const port        = process.env.PORT || 3000;
const router      = express.Router();
const session     = require('express-session');
const passport    = require('passport');
const flash       = require('connect-flash');
const cookieParser= require('cookie-parser');
const hbs  = require('express-handlebars');

//Setting up twilio messaging API
// Need to create an account in twilio
// const account   = '';
// const authToken = '';
// const twilio    = require('twilio')(account,authToken);

//Static folder
app.use( express.static(path.join(__dirname, 'public'), {extensions: ['html', 'htm']}) );

//View engine setup
app.engine('hbs', hbs({
    extname: 'hbs',
}));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs');

//Body Parser setup
app.use(body_parser.urlencoded({
    extended: true
}));
app.use(body_parser.json());

//Need to check this
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cookieParser('secret'));
app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'applicationPortal',
    resave: true, 
    saveUninitialized: true}));




//Importing the passport and config files
require('./models/passport')(passport);
require('./models/routing')(app,passport);

//Start the server 
http.listen(port, () => console.log(`Server is listening on port ${port}`));   

//Exports the module
module.exports=app;