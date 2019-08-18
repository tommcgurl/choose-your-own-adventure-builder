const db = require('../index');

module.exports = async function(provider, providerId) {
  try {
    const res = await db.query(
      `
      SELECT
        u.id
        ,u.username
      FROM users AS u
      JOIN auth_provider_info AS p ON u.id = p.user_id
      WHERE 
        p.provider = $1
        AND p.provider_id = $2
    `,
      [provider, providerId]
    );
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};
