const db = require('../index');

module.exports = async function(username, provider, providerId) {
  try {
    const res = await db.query(
      `
      INSERT INTO users(username, provider, provider_id)
      VALUES($1, $2, $3)
      RETURNING
        id
        ,username
        ,provider
        ,provider_id
    `,
      [username, provider, providerId]
    );
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};
