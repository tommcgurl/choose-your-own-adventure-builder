require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const userRepository = require("../repositories/UserRepository");

const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

module.exports = function configPassport(app) {
  app.use(passport.initialize());

  passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      (req, username, password, done) => {
        // vvv Searching the mock user database to see if a match is found
        let user = userRepository
          .getUsers()
          .filter(u => u.username === username)[0];
        // vvv If the user exists, checks the password - if both checkout, returns the user object from the database
        return user
          ? user.password === password
            ? done(null, user)
            : // vvv If the user exists but the password is incorrect
              done(null, false, { message: "Incorrect Password." })
          : // vvv If the user is not found in the database
            done(null, false, { message: "That username does not exist." });
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        callbackURL: "/auth/google/redirect",
        clientID: OAUTH_CLIENT_ID,
        clientSecret: OAUTH_CLIENT_SECRET
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(`accessToken: ${accessToken}`);
        console.log(`refreshToken: ${refreshToken}`);
        try {
          let user = userRepository.getUserByProviderId(
            profile.provider,
            profile.id
          );
          if (!user) {
            user = userRepository.createUser(
              profile.provider,
              profile.id,
              profile.displayName
            );
          }
          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        callbackURL: "/auth/facebook/redirect",
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET
      },
      (accessToken, refreshToken, profile, done) => {
        let user = userRepository
          .getUsers()
          .filter(u => u.username === profile.displayName)[0];
        return user
          ? done(null, user)
          : done(null, {
              id: userRepository.getUsers().length + 1,
              username: profile.displayName
            });
      }
    )
  );

  return passport;
};
