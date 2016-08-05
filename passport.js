const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

// Used for login
passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'The username you entered does not exist.' }); }
      if (!user.verifyPassword(password)) { return done(null, false, { message: 'The password you entered is incorrect.' }); }
      return done(null, user, { message: 'You are now logged in.' });
    });
  }
));

// Used for signup
passport.use('local-register', new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username}, (err, user) => {
    //  If user already exists, then the desired username is invalid
    if (err) { return done(err) }
    if (user) { return(done(null, false, {message: 'This username you entered is already taken.'})); }
    else {
      // we can create our user
      const user = new User({ username: username});
      user.password = user.generateHash(password);
      user.save( err => {
        if (err) { throw err }
        return done(null, user);
      });
    }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;