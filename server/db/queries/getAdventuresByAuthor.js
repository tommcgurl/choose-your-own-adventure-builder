const db = require('../index');

module.exports = async function(userId) {
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
      FROM adventures as a
      JOIN adventure_authors as aa ON a.id = aa.adventure_id
      WHERE 
        aa.user_id = $1
    `,
      [userId]
    );
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }

  return [];
};