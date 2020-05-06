/**
 * @author Chidambaram Crushev, Valentine Aduaka
*/

//Dependencies
const express     = require('express');
const path        = require('path');
const app         = express();
const exphbs      = require('express-handlebars');
const http        = require('http').createServer(app);
const session     = require('express-session'); // used
const bodyParser = require('body-parser'); // used
const passport   = require('./config/passport-config');

const cookieParser= require('cookie-parser');
const routes      = require('./routes/routes'); // used
const port        = process.env.PORT || 3000; // used
const flash         = require('connect-flash');

// Handlebars engine setup
const hbs = exphbs.create({
    defaultLayout:  path.join(__dirname, 'views/layouts/main'), 
    layoutsDir:     path.join(__dirname, 'views/layouts'),
    views:          path.join(__dirname, 'views'),
    extname:        'hbs'
});

// Set Handlebars Engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


// Passport Middleware config
app.use(express.static("public"));
app.use(require('express-session')({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


// Static folder
app.use( express.static(path.join(__dirname, 'public'), {extensions: ['html', 'htm']}) );
app.use(express.urlencoded({ extended: true }));

// Use flash
app.use(flash());

// Register all application routes
app.use('/', routes);

// Start the server 
http.listen(port, () => console.log(`Server is listening on port ${port}`));   

//Exports the module
// module.exports = app;