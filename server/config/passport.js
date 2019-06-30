const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const queries = require('../db/queries');

module.exports = function configPassport(app) {
  app.use(passport.initialize());

  const handleAuthentication = async (
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    try {
      let user = await queries.getUserByProviderId(
        profile.provider,
        profile.id
      );
      if (!user) {
        user = await queries.createUser(
          profile.displayName,
          profile.provider,
          profile.id
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
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      handleAuthentication
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
      },
      handleAuthentication
    )
  );

  return passport;
};
