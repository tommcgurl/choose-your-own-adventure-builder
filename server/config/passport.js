require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
// const TwitterStrategy = require("passport-twitter").Strategy;
const userRepository = require('../repositories/userRepository');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
// const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
// const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

module.exports = function configPassport(app) {
  app.use(passport.initialize());

  const handleAuthentication = async (
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    try {
      let user = await userRepository.getUserByProviderId(
        profile.provider,
        profile.id
      );
      if (!user) {
        user = await userRepository.createUser(
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
        clientSecret: GOOGLE_CLIENT_SECRET,
      },
      handleAuthentication
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
      },
      handleAuthentication
    )
  );

  /*Not using Twitter authentication because it requires sessions
    but I'm leaving this here in case the package gets updated
    or if we decide to use sessions */

  // passport.use(
  //   new TwitterStrategy(
  //     {
  //       consumerKey: TWITTER_CONSUMER_KEY,
  //       consumerSecret: TWITTER_CONSUMER_SECRET
  //     },
  //     handleAuthentication
  //   )
  // );

  return passport;
};
