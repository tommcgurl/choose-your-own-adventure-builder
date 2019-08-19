const db = require('../index');

module.exports = async function(adventureId) {
  try {
    const res = await db.query(
      `
      SELECT
        id
        ,username
        ,bio
        ,photo
      FROM users as u
      JOIN adventure_authors as aa ON u.id = aa.user_id
      WHERE 
        aa.adventure_id = $1
    `,
      [adventureId]
    );
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }

  return [];
};
