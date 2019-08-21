const db = require('../index');

module.exports = async function(email) {
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
        email = $1
    `,
      [email]
    );
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};
