const db = require('../index');

module.exports = async function(
  { id, title, published, intro, mainStory, items, genreId, coverImage },
  authorId
) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    const res = await client.query(
      `
      INSERT INTO adventures(id, title, published, intro, main_story, items, genre_id, cover_image)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING
        id,
        title,
        published,
        intro,
        main_story as "mainStory",
        items,
        genre_id as "genreId",
        cover_image as "coverImage"
    `,
      [id, title, published, intro, mainStory, items, genreId, coverImage]
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
