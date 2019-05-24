const db = require('../index');

module.exports = async function({
  id,
  title,
  published,
  intro,
  mainStory,
  items,
}) {
  try {
    const res = await db.query(
      `
      INSERT INTO adventures(id, title, published, intro, main_story, items)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING
        id,
        title,
        published,
        intro,
        main_story,
        items
    `,
      [id, title, published, intro, mainStory, items]
    );
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};
