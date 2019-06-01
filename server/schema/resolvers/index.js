const queryResolvers = require('./queryResolvers');
const mutationResolvers = require('./mutationResolvers');
const JSONResolver = require('./JSONResolver');
const DateTimeResolver = require('./DateTimeResolver');
const adventureResolvers = require('./adventureResolvers');

module.exports = [
  queryResolvers,
  mutationResolvers,
  JSONResolver,
  DateTimeResolver,
  adventureResolvers,
];
