export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      req.session.flash = { type: 'error', message: 'Please login to continue.' };
      return res.redirect('/auth/login');
    }

    if (!allowedRoles.includes(req.user.role)) {
      req.session.flash = { type: 'error', message: 'You are not authorized to access this page.' };
      return res.status(403).render('errors/404', { pageTitle: 'Access Denied' });
    }

    next();
  };
};
