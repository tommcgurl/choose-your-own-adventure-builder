const db = require('../index');

module.exports = async function(adventureId) {
  try {
    const res = await db.query(
      `
      SELECT
        TO_CHAR(AVG(rating), '9.9') AS average
      FROM adventure_reviews
      WHERE
        adventure_id = $1
      `,
      [adventureId]
    );
    return res.rows[0].average;
  } catch (err) {
    console.log(err.stack);
  }

  return [];
};
