module.exports = {
    ensureAuthenticated: function(res, req, next) {
    if(req.isAuthenticated()) {
      return next();
    } else {
      res.resdirect('/login');
    }
  }
}
