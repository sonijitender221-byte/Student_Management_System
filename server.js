import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';

import { connectDB } from './config/db.js';
import { configurePassport } from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import { isAuthenticated } from './middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'development-session-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  res.locals.flash = req.session.flash || null;
  delete req.session.flash;
  next();
});

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  return res.redirect('/auth/login');
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard/home', {
    pageTitle: 'Dashboard Home',
    user: req.user
  });
});

app.get('/settings', isAuthenticated, (req, res) => {
  res.render('dashboard/settings', { pageTitle: 'Settings' });
});

app.get('/profile', isAuthenticated, (req, res) => {
  res.render('dashboard/profile', { pageTitle: 'Profile' });
});

app.use((req, res) => {
  res.status(404).render('errors/404', { pageTitle: 'Page Not Found' });
});

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  res.status(500).send('Internal Server Error');
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed. Check your MongoDB connection.');
    process.exit(1);
  }
};

startServer();
