const db = require('../index');

module.exports = async function() {
  try {
    const res = await db.query(
      `
      SELECT
        id
        ,name
      FROM genres
    `
    );
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }
};
