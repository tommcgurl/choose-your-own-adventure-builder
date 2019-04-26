const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userRepository = require("../repositories/UserRepository");

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

  return passport;
};
