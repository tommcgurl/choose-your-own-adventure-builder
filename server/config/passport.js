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
        let user = userRepository
          .getUsers()
          .filter(u => u.username === username)[0];
        return user
          ? user.password === password
            ? done(null, user)
            : done(null, false, { message: "Incorrect Password." })
          : done(null, false, { message: "That username does not exist." });
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
        return user // If the user exists in the database, send it back to the authentication handler, otherwise send back a new user object
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
