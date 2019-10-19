const queryResolvers = require('./queryResolvers');
const mutationResolvers = require('./mutationResolvers');
const JSONResolver = require('./JSONResolver');
const DateTimeResolver = require('./DateTimeResolver');
const adventureResolvers = require('./adventureResolvers');
const userResolvers = require('./userResolvers');
const libraryBookResolvers = require('./libraryBookResolvers');
const reviewResolver = require('./reviewResolver');

module.exports = [
  queryResolvers,
  mutationResolvers,
  JSONResolver,
  DateTimeResolver,
  adventureResolvers,
  userResolvers,
  libraryBookResolvers,
  reviewResolver,
];
