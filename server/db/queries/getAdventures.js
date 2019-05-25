const db = require('../index');

module.exports = async function() {
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
      FROM adventures
    `
    );
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }
};
