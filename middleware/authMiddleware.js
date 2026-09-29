export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  req.session.flash = { type: 'error', message: 'Please login to continue.' };
  return res.redirect('/auth/login');
};

export const isGuest = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }

  next();
};
