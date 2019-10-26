const queries = require('../../db/queries');

module.exports = {
  Review: {
    user: parent => queries.getUserById(parent.userId),
  },
};
