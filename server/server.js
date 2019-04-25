const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");
const users = require("./mock_data/mockUsers"); // straight up importing mock users because fuck iiiiiiiit

require("dotenv").config();

const app = express();
const adventuresRouter = require("./routes/adventures");

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      // checking the mock user array. This will likely be replaced with a call to a separate UserRepository, similar to AdventureRepository
      let user = users.filter(u => u.username === username)[0];
      return user
        ? user.password === password
          ? done(null, user)
          : done(null, false, { message: "Incorrect Password" })
        : done(null, false, { message: "Incorrect Username" });
    }
  )
);

app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    console.log(req.body);
    res.json({ message: "Login successful" });
  }
);
app.use("/adventures", adventuresRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
