const db = require('../index');
const { isValidUsername } = require('../../validators');

module.exports = async function(id, user) {
  const { username, bio, photo } = user;
  try {
    if (!isValidUsername(username)) throw new Error('Invalid username');
    const res = await db.query(
      `
      UPDATE users
      SET
        username = $1
        ,bio = $2
        ,photo = $3
      WHERE 
        id = $4
      RETURNING
        id
        ,username
        ,bio
        ,photo
    `,
      [username, bio || '', photo || '', id]
    );
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};
