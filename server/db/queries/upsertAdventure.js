const db = require('../index');

module.exports = async function(
  { id, title, published, intro, mainStory, items, genre, coverImage },
  authorId
) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    const res = await client.query(
      `
      INSERT INTO adventures(id, title, published, intro, main_story, items, genre_id, cover_image)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT ON CONSTRAINT adventures_pkey DO UPDATE
      SET
        title = $2,
        published = $3,
        intro = $4,
        main_story = $5,
        items = $6,
        genre_id = $7,
        cover_image = $8
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
      [
        id,
        title,
        published,
        intro,
        mainStory,
        items,
        genre && genre.id,
        coverImage,
      ]
    );

    await client.query(
      `
      INSERT INTO adventure_authors(user_id, adventure_id)
      VALUES($1, $2)
      ON CONFLICT ON CONSTRAINT adventure_authors_pkey DO NOTHING
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
