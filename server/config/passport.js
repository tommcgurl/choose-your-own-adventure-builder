require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const userRepository = require("../repositories/UserRepository");

const oauthClientID = process.env.OAUTH_CLIENT_ID;
const oauthClientSecret = process.env.OAUTH_CLIENT_SECRET;

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
        clientID: oauthClientID,
        clientSecret: oauthClientSecret
      },
      (accessToken, refreshToken, profile, done) => {
        let user = userRepository
          .getUsers()
          .filter(u => u.username === profile.displayName)[0];
        // vvv If the user exists in the "database", this sends the user object back to the authentication handler, otherwise returns done() with a new user object
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
