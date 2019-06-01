const db = require('../index');

module.exports = async function(take, publishedBefore) {
  take = take || 'ALL';
  publishedBefore = publishedBefore || new Date();

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
      WHERE published < $1
      ORDER BY published DESC
      LIMIT $2;
    `,
      [publishedBefore, take]
    );
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }
};
