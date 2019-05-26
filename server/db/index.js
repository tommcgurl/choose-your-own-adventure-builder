const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
  /**
   * Only to be used for single queries (not transactions).
   * https://node-postgres.com/features/pooling#single-query
   */
  query: async (text, params) => {
    return await pool.query(text, params);
  },
  /**
   * Use the returned "PoolClient" object to query the database. Must wrap a call to PoolClient.release() in a finally block.
   * https://node-postgres.com/features/transactions#a-pooled-client-with-async-await
   */
  connect: async () => await pool.connect(),
};
