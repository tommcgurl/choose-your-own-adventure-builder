const db = require('../index');

module.exports = async function(adventureId) {
  try {
    const res = await db.query(
      `
      SELECT
        id
        ,adventure_id as "adventureId"
        ,user_id as "userId"
        ,rating
        ,headline
        ,review as "reviewBody"
      FROM adventure_reviews
      WHERE
        adventure_id = $1
      `,
      [adventureId]
    );
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }

  return [];
};
