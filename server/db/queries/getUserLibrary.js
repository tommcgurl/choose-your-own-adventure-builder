const db = require('../index');

module.exports = async function(userId) {
  const client = await db.connect();

  try {
    const adventures = await client.query(
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
      JOIN adventure_readers as ar ON a.id = ar.adventure_id
      WHERE 
        ar.user_id = $1;
    `,
      [userId]
    );
    const progressions = await client.query(
      `
      SELECT
        adventure_id as "adventureId"
        ,progress
      FROM adventure_readers
      WHERE 
        user_id = $1;
    `,
      [userId]
    );
    return [adventures.rows, progressions.rows];
  } catch (err) {
    console.log(err.stack);
    return [[], []];
  } finally {
    client.release();
  }
};
