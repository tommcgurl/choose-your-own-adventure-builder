const db = require('../index');

module.exports = async function(username, provider, providerId) {
  const client = await db.connect();

  try {
    await client.query('BEGIN');
    const { rows } = await client.query(
      `
      INSERT INTO users(username)
      VALUES($1)
      RETURNING
        id
        ,username
    `,
      [username]
    );
    await client.query(
      `
      INSERT INTO auth_provider_info(provider, provider_id, user_id)
      VALUES($1, $2, $3)
    `,
      [provider, providerId, rows[0].id]
    );
    await client.query('COMMIT');
    return rows[0];
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
};
