require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const userRepository = require("../repositories/UserRepository");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

module.exports = function configPassport(app) {
  app.use(passport.initialize());

  const handleAuthentication = (accessToken, refreshToken, profile, done) => {
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
  };

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET
      },
      handleAuthentication
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        callbackURL: "/auth/facebook/redirect",
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET
      },
      handleAuthentication
    )
  );

  return passport;
};
