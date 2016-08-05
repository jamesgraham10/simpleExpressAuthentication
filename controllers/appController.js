const express = require('express');
const router = express.Router();
const requireAuth = require('../customMiddleware').requireAuth;

router.get('/', requireAuth, (req, res) => {
  // This is where our JavaScript app gets bootstrapped
  res.render('app', { message: req.flash('success') } );
});

module.exports = router;