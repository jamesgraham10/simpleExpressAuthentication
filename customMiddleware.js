function requireAuth (req, res, next) {
  // Check users authentication status at a restricted route
  if (req.isAuthenticated()) { return next(); }
  // If they are not logged in, redirect them
  res.redirect('/');
}

function redirectToAppWithAuth (req, res, next) {
  // When user hits the index, redirect them if they are already logged in
  if (req.isAuthenticated()) { res.redirect('/app'); }
  // Otherwise continue with the request
  else { next(); }
}

module.exports = { requireAuth, redirectToAppWithAuth };