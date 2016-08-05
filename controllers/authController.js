const express = require('express');
const router = express.Router();

const User = require('../models/User');
const passport = require('../passport');
const redirectToAppWithAuth = require('../customMiddleware').redirectToAppWithAuth;

router.get('/', redirectToAppWithAuth, (req, res) => {
  res.render('index', { message: req.flash('error') } );
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/',
    failureFlash: true,
    successFlash: true
  })
);

router.post('/register', passport.authenticate('local-register', {
  successRedirect : '/app',
  failureRedirect : '/',
  failureFlash : true
}));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;