/**
 * @author Chidambaram Crushev, Valentine Aduaka
*/

//Dependencies
const express     = require('express');
const path        = require('path');
const app         = express();
const exphbs      = require('express-handlebars');
const http        = require('http').createServer(app);
const io          = require('socket.io')(http);
const routes      = require('./routes/routes');
const body_parser = require('body-parser');
const port        = process.env.PORT || 3000;
const router      = express.Router();
const session     = require('express-session');
const passport    = require('passport');
const flash       = require('connect-flash');
const cookieParser= require('cookie-parser');

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


// app.get('/', (req, res) => {
//     res.render('index', {
//         title: 'Home page'
//     });
// });


//Body Parser setup
// app.use(body_parser.urlencoded({
//     extended: true
// }));
// app.use(body_parser.json());

// //Need to check this
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
// app.use(cookieParser('secret'));
// app.use(session({ cookie: { maxAge: 60000 }, 
//     secret: 'applicationPortal',
//     resave: true, 
//     saveUninitialized: true})
// );


// //Importing the passport and config files
// require('./models/passport')(passport);
// require('./models/routing')(app,passport);

// Static folder
app.use( express.static(path.join(__dirname, 'public'), {extensions: ['html', 'htm']}) );

app.use(express.urlencoded({ extended: true }));

// Register all application routes
app.use('/', routes);

// Start the server 
http.listen(port, () => console.log(`Server is listening on port ${port}`));   

//Exports the module
// module.exports = app;