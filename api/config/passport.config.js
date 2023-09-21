const passport = require('passport');
const local = require('passport-local');
const GithubStrategy = require('passport-github2');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../index');
const { createHash, isValidPassword } = require('../utils/bcrypt');

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await User.findOne({ email: username });

          if (user) {
            console.log('Usuario existe');
            return done(null, false);
          }

          const newUserInfo = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };

          const newUser = await User.create(newUserInfo);

          return done(null, newUser);
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
    const user = await User.findById(id);
    done(null, user);
  });

  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ email: username });

          if (!user) {
            console.log('Usuario no existe');
            return done(null, false);
          }

          if (!isValidPassword(user, password)) return done(null, false);

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    'github',
    new GithubStrategy(
      {
        clientID: 'Iv1.9a5086a3abf47310',
        clientSecret: 'f9324af8c973c46ec334d3b1b7ad5b9fbaed3c63',
        callbackURL: 'http://localhost:3000/auth/githubcallback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const user = await User.findOne({ email: profile._json.email });

          if (!user) {
            const newUserInfo = {
              first_name: profile._json.name,
              last_name: '',
              age: 18,
              email: profile._json.email,
              password: '',
            };

            const newUser = await User.create(newUserInfo);
            return done(null, newUser);
          }
          done(null, user);
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );

  passport.use(
    'google',
    new GoogleStrategy(
      {
        clientID:
          '307211392609-b44cgs4bgej9fuehukr4g49n51rjht29.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3000/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);

          const user = await User.findOne({ googleId: profile._json.sub });

          if (!user) {
            const newUserInfo = {
              googleId: profile._json.sub,
              first_name: profile._json.given_name,
              last_name: profile._json.family_name,
              age: 18,
              email: profile._json.email,
              password: '',
            };

            const newUser = await User.create(newUserInfo);

            return done(null, newUser);
          }

          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

module.exports = initializePassport;