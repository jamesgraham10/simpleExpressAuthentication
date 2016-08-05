const express = require('express');
const app = express();

// Middleware Dependencies
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./passport');
const flash = require('connect-flash');

// Setup View Engine & Static Files
app.set('view engine', 'jade');
app.use(express.static('public'));

// Parsing Middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded());

// Passport Middleware
app.use(session({ secret: 'jimbean' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
const authController = require('./controllers/authController');
app.use('/', authController);

app.use('/app', appController);
const appController = require('./controllers/appController');

// Redirect user to index for any other routes
app.get('*', (req, res) => { res.redirect('/') });

// Port config
const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));