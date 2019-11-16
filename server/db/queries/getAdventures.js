const db = require('../index');

module.exports = async function(adventureIds) {
  try {
    const res = await db.query(
      `
      SELECT
        a.id
        ,a.title
        ,a.published
        ,a.blurb
        ,a.first_part_id as "firstPartId"
        ,a.story_parts as "storyParts"
        ,a.items
        ,a.genre_id as "genreId"
        ,a.cover_image as "coverImage"
      FROM UNNEST($1::uuid[]) adventure_id
      INNER JOIN adventures a on a.id=adventure_id
    `,
      [adventureIds]
    );
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }
};
