const db = require('../index');

module.exports = async function(userId) {
  try {
    const res = await db.query(
      `
      SELECT
        id
        ,title
        ,published
        ,blurb
        ,first_part_id AS "firstPartId"
        ,story_parts AS "storyParts"
        ,items
        ,genre_id AS "genreId"
        ,cover_image AS "coverImage"
      FROM adventures AS a
      JOIN adventure_authors AS aa ON a.id = aa.adventure_id
      WHERE 
        aa.user_id = $1
        AND a.published IS NULL
    `,
      [userId]
    );
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }

  return [];
};
