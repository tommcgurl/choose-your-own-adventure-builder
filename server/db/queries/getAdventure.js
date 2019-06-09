const db = require('../index');

module.exports = async function(adventureId) {
  try {
    const res = await db.query(
      `
      SELECT
        id
        ,title
        ,published
        ,intro
        ,main_story
        ,items
        ,genre_id
      FROM adventures
      WHERE 
        id = $1
    `,
      [adventureId]
    );
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};
