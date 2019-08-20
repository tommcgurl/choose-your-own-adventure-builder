const db = require('../index');

module.exports = async function(take, publishedBefore, searchString, genreIds) {
  take = take || 'ALL';
  publishedBefore = publishedBefore || new Date();
  searchString = searchString && /\w+/.test(searchString) ? searchString : '';

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
      WHERE
        published IS NOT NULL
        AND published < $1
        AND ($3 = '' OR title @@ $3)
        AND genre_id = ANY($4::int[])
      ORDER BY published DESC
      LIMIT $2;
    `,
      [publishedBefore, take, searchString, genreIds]
    );
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }

  return [];
};