const db = require('../index');

module.exports = async function(adventureId) {
  try {
    const res = await db.query(
      `
      SELECT
        COUNT(adventure_id) AS count
      FROM adventure_readers
      WHERE 
        adventure_id = $1;
    `,
      [adventureId]
    );
    return res.rows[0].count;
  } catch (err) {
    console.log(err.stack);
  }
};
