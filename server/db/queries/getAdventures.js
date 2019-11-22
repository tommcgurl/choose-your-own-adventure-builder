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
      FROM adventures a
      JOIN UNNEST($1::uuid[]) WITH ORDINALITY t(id, ord) USING (id)
      ORDER BY t.ord
    `,
      [adventureIds]
    );
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }
};
