const db = require('../index');

module.exports = async function(userId) {
  try {
    const res = await db.query(
      `
      SELECT
        id
        ,user_id as "userId"
        ,adventure_id as "adventureId"
        ,rating
        ,headline
        ,review as "reviewBody"
      FROM adventure_reviews
      WHERE
        user_id = $1
      `,
      [userId]
    );
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }

  return [];
};
