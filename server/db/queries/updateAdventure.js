const db = require('../index');

module.exports = async function(
  { id, title, published, intro, mainStory, items, genreId, coverImage },
  userId
) {
  try {
    const res = await db.query(
      `
      UPDATE adventures as a
      SET
        title = $1
        ,published = $2
        ,intro = $3
        ,main_story = $4
        ,items = $5
        ,genre_id = $6
        ,cover_image = $7
      FROM adventures as ta
      JOIN adventure_authors as aa ON aa.adventure_id = ta.id AND aa.user_id = $8
      WHERE a.id = $9
      RETURNING
        a.id,
        a.title,
        a.published,
        a.intro,
        a.main_story,
        a.items,
        a.genre_id,
        a.cover_image
    `,
      [
        title,
        published,
        intro,
        mainStory,
        items,
        genreId,
        coverImage,
        userId,
        id,
      ]
    );
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};
