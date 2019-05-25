const db = require('../index');

module.exports = async function(
  { id, title, published, intro, mainStory, items },
  authorId
) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    const res = await client.query(
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

    await client.query(
      `
      INSERT INTO adventure_authors(user_id, adventure_id)
      VALUES($1, $2)
    `,
      [authorId, res.rows[0].id]
    );
    await client.query('COMMIT');
    return res.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    console.log(err.stack);
  } finally {
    client.release();
  }
};
