const db = require('../index');

module.exports = async function(
  { id, title, published, intro, mainStory, items },
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
      FROM adventures as ta
      JOIN adventure_authors as aa ON aa.adventure_id = ta.id AND aa.user_id = $6
      WHERE a.id = $7
      RETURNING
        id,
        title,
        published,
        intro,
        main_story,
        items
    `,
      [title, published, intro, mainStory, items, userId, id]
    );
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};
