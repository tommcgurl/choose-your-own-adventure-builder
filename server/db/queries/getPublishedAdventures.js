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
        ,main_story as "mainStory"
        ,items
        ,genre_id as "genreId"
        ,cover_image as "coverImage"
      FROM adventures
      WHERE published IS NOT NULL and published < $1
      ORDER BY published DESC
      LIMIT $2;
    `,
      [publishedBefore, take]
    );
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }

  return [];
};
