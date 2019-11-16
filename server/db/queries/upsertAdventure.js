const db = require('../index');
const {
  pushAdventureToElasticSearch,
} = require('../../services/elasticsearch');

module.exports = async function(
  {
    id,
    title,
    published,
    blurb,
    firstPartId,
    storyParts,
    items,
    genre,
    coverImage,
  },
  authorId
) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    const res = await client.query(
      `
      INSERT INTO adventures(id, title, published, blurb, first_part_id, story_parts, items, genre_id, cover_image)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT ON CONSTRAINT adventures_pkey DO UPDATE
      SET
        title = $2,
        published = $3,
        blurb = $4,
        first_part_id = $5,
        story_parts = $6,
        items = $7,
        genre_id = $8,
        cover_image = $9
      RETURNING
        id,
        title,
        published,
        blurb,
        first_part_id as "firstPartId",
        story_parts as "storyParts",
        items,
        genre_id as "genreId",
        cover_image as "coverImage"
    `,
      [
        id,
        title,
        published,
        blurb,
        firstPartId,
        storyParts,
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

    if (res.rows[0].published) {
      pushAdventureToElasticSearch(res.rows[0]);
    }

    return res.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    console.log(err.stack);
  } finally {
    client.release();
  }
};
