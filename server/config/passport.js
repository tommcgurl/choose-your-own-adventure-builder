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
        const email =
          profile.emails.length && profile.emails[0].verified
            ? profile.emails[0].value
            : null;
        if (email) {
          user = await queries.getUserByEmail(email);
        }

        if (user) {
          await queries.insertAuthProviderInfo(
            profile.provider,
            provider.id,
            user.id
          );
        } else {
          user = {
            provider: profile.provider,
            providerId: profile.id,
            photo: profile.photos.length ? profile.photos[0].value : null,
            email,
          };
        }
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
