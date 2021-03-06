require('dotenv').config();
const port = process.env.PORT || 3002;

const express = require('express');
const cors = require('cors');

const app = express();
const configPassport = require('./config/passport');
const authRouter = require('./routes/auth');

if (process.env.NODE_ENV !== 'production') {
  const logger = require('morgan');
  app.use(logger('dev'));
}
app.use(cors());
app.use(express.json());
const passport = configPassport(app);

const apolloServer = require('./apolloServer');
apolloServer.applyMiddleware({ app });

app.use('/auth', authRouter(passport));

app.listen(port, () => {
  console.log(
    `Listening on port http://localhost:${port} ...with graphql path http://localhost:${port}${
      apolloServer.graphqlPath
    }`
  );
});
