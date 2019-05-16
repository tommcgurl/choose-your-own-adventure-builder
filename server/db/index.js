const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
  query: async (text, params) => {
    return await pool.query(text, params);
  },
};
