import bcrypt from 'bcrypt';
import passport from 'passport';
import User from '../models/User.js';

const allowedRoles = ['admin', 'teacher', 'student'];

export const getLoginPage = (req, res) => {
  res.render('auth/login', { pageTitle: 'Login' });
};

export const getRegisterPage = (req, res) => {
  res.render('auth/register', { pageTitle: 'Register' });
};

export const getForgotPasswordPage = (req, res) => {
  res.render('auth/forgot-password', { pageTitle: 'Forgot Password' });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const cleanName = name?.trim();
    const cleanEmail = email?.trim().toLowerCase();
    const selectedRole = role?.toLowerCase();

    if (!cleanName || !cleanEmail || !password || !selectedRole) {
      req.session.flash = { type: 'error', message: 'All fields are required.' };
      return res.redirect('/auth/register');
    }

    if (!allowedRoles.includes(selectedRole)) {
      req.session.flash = { type: 'error', message: 'Invalid role selected.' };
      return res.redirect('/auth/register');
    }

    if (password.length < 6) {
      req.session.flash = { type: 'error', message: 'Password must be at least 6 characters.' };
      return res.redirect('/auth/register');
    }

    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      req.session.flash = { type: 'error', message: 'An account with this email already exists.' };
      return res.redirect('/auth/register');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      role: selectedRole
    });

    req.session.flash = { type: 'success', message: 'Registration successful. Please login.' };
    return res.redirect('/auth/login');
  } catch (error) {
    console.error('Registration error:', error);
    req.session.flash = { type: 'error', message: 'Registration failed. Please try again.' };
    return res.redirect('/auth/register');
  }
};

export const loginUser = (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) return next(error);

    if (!user) {
      req.session.flash = {
        type: 'error',
        message: info?.message || 'Invalid email or password.'
      };
      return res.redirect('/auth/login');
    }

    req.logIn(user, (loginError) => {
      if (loginError) return next(loginError);

      req.session.flash = {
        type: 'success',
        message: `Welcome, ${user.name}!`
      };

      return res.redirect('/dashboard');
    });
  })(req, res, next);
};

export const logoutUser = (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);

    req.session.destroy((sessionError) => {
      if (sessionError) return next(sessionError);
      res.clearCookie('connect.sid');
      return res.redirect('/auth/login');
    });
  });
};
