require('dotenv').config();
const port = process.env.PORT || 8000;

const express = require('express');
const cors = require('cors');

const app = express();
const configPassport = require('./config/passport');
const adventuresRouter = require('./routes/adventures');
const draftsRouter = require('./routes/drafts');
const authRouter = require('./routes/auth');

app.use(cors());
app.use(express.json());
const passport = configPassport(app);

app.use('/auth', authRouter(passport));
app.use('/adventures', adventuresRouter);
app.use('/drafts', draftsRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
