const db = require('../index');

module.exports = async function(username) {
  try {
    const res = await db.query(
      `
      SELECT
        id
        ,username
        ,bio
        ,photo
      FROM users
      WHERE 
      LOWER(username) = LOWER($1)
    `,
      [username]
    );
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};
