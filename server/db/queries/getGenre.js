const db = require('../index');

module.exports = async function(id) {
  try {
    const res = await db.query(
      `
      SELECT
        id
        ,name
        ,description
      FROM genres
      WHERE id = $1
    `,
      [id]
    );
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};
