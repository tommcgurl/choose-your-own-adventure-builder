const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const users = require("../mock_data/mockUsers");

passport.use(
  new LocalStrategy((username, password, done) => {
    // checking the mock user array. This will likely be replaced with a UserRepository, similar to adventures
    let user = users.filter(u => u.username === username)[0];
    return user
      ? user.password === password
        ? done(null, user)
        : done(null, false, { message: "Incorrect Password" })
      : done(null, false, { message: "Incorrect Username" });
  })
);
