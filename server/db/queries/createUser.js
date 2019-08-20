const db = require('../index');

module.exports = async function(user, provider, providerId) {
  const { username, photo, email } = user;
  const client = await db.connect();

  try {
    await client.query('BEGIN');
    const { rows } = await client.query(
      `
      INSERT INTO users(username, photo, email)
      VALUES($1, $2, $3)
      RETURNING
        id
        ,username
    `,
      [username, photo, email]
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
