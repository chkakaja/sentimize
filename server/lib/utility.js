exports.ensureAutheticated = function(res, req, next) {
  if(req.isAutheticated()) {
    return next();
  } else {
    res.resdirect('/login');
  }
};
