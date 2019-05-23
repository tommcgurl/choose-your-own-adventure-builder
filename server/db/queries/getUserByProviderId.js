const db = require('../index');

module.exports = async function(provider, providerId) {
  try {
    const res = await db.query(
      `
      SELECT
        id
        ,username
        ,provider
        ,provider_id
      FROM users
      WHERE 
        provider = $1
        AND provider_id = $2
    `,
      [provider, providerId]
    );
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};
