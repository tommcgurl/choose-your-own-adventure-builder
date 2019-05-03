require('dotenv').config();
const port = process.env.PORT || 3002;

const express = require('express');
const cors = require('cors');

const app = express();
const configPassport = require('./config/passport');
const adventuresRouter = require('./routes/adventures');
const draftsRouter = require('./routes/drafts');
const authRouter = require('./routes/auth');

if (process.env.NODE_ENV !== 'production') {
  const logger = require('morgan');
  app.use(logger('dev'));
}
app.use(cors());
app.use(express.json());
const passport = configPassport(app);

// begin graphql stuff
var { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app });

// end graphql stuff

app.use('/auth', authRouter(passport));
app.use('/adventures', adventuresRouter);
app.use('/drafts', draftsRouter);

app.listen(port, () => {
  console.log(
    `Listening on port ${port}...with graphql path ${apolloServer.graphqlPath}`,
  );
});
