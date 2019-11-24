const db = require('../index');

module.exports = async function(userId, adventureId) {
  try {
    const res = await db.query(
      `
      SELECT
        user_id AS "userId"
        ,adventure_id AS "adventureId"
        ,progress
      FROM adventure_readers
      WHERE 
        user_id = $1
        AND adventure_id = $2;
    `,
      [userId, adventureId]
    );
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};
