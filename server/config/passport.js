const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../mock_data/mockUsers'); // straight up importing mock users because fuck iiiiiiiit

module.exports = function configPassport(app) {
  app.use(passport.initialize());

  passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      (req, username, password, done) => {
        console.log(req);
        // checking the mock user array. This will likely be replaced with a call to a separate UserRepository, similar to AdventureRepository
        let user = users.filter(u => u.username === username)[0];
        return user
          ? user.password === password
            ? done(null, user)
            : done(null, false, { message: 'Incorrect Password' })
          : done(null, false, { message: 'Incorrect Username' });
      },
    ),
  );

  return passport;
};
