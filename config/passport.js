import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const configurePassport = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

          if (!user) {
            return done(null, false, { message: 'Invalid email or password.' });
          }

          const passwordMatches = await bcrypt.compare(password, user.password);
          if (!passwordMatches) {
            return done(null, false, { message: 'Invalid email or password.' });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).select('-password');
      done(null, user || false);
    } catch (error) {
      done(error);
    }
  });
};
