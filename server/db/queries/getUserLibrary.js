const db = require('../index');

module.exports = async function(userId) {
  try {
    const res = await db.query(
      `
      SELECT
        user_id AS "userId"
        ,adventure_id AS "adventureId"
        ,progress
      FROM adventure_readers
      WHERE 
        user_id = $1;
    `,
      [userId]
    );
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }
};
