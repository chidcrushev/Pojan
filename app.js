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
const helpers        = require('./config/helpers');

// Handlebars engine setup
const hbs = exphbs.create({
    defaultLayout:  path.join(__dirname, 'views/layouts/main'), 
    layoutsDir:     path.join(__dirname, 'views/layouts'),
    views:          path.join(__dirname, 'views'),
    extname:        'hbs',
    helpers: {
        eq: (v1, v2) => v1 === v2,
        ne: (v1, v2) => v1 !== v2,
        lt: (v1, v2) => v1 < v2,
        gt: (v1, v2) => v1 > v2,
        lte: (v1, v2) => v1 <= v2,
        gte: (v1, v2) => v1 >= v2,
        and() {
            return Array.prototype.every.call(arguments, Boolean);
        },
        or() {
            return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
        },
        
        initials: helpers.initials
    }
});

// Set Handlebars Engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Passport Middleware config
// app.use(express.static("public"));
app.use(require('express-session')({ 
    secret: 'secret', 
    resave: false, 
    saveUninitialized: false, 
    cookie: { _expires: (10 * 60 * 60 * 1000) } 
}));
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