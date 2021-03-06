const db = require('../index');

module.exports = async function(adventureId) {
  try {
    const res = await db.query(
      `
      SELECT
        id
        ,title
        ,published
        ,blurb
        ,first_part_id as "firstPartId"
        ,story_parts as "storyParts"
        ,items
        ,genre_id as "genreId"
        ,cover_image as "coverImage"
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
