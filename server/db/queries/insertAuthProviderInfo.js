const db = require('../index');

module.exports = async function(provider, providerId, userId) {
  try {
    const res = await db.query(
      `
      INSERT INTO auth_provider_info(provider, provider_id, user_id)
      VALUES($1, $2, $3)
    `,
      [provider, providerId, userId]
    );
  } catch (err) {
    console.log(err.stack);
  }
};
