const db = require('../index');

module.exports = async function(adventureId, review, userId) {
  const { id, rating, headline, reviewBody } = review;
  const client = await db.connect();

  try {
    await client.query(
      `
        INSERT INTO adventure_reviews(id, adventure_id, user_id, rating, headline, review)
        VALUES($1, $2, $3, $4, $5, $6)
      `,
      [id, adventureId, userId, rating, headline, reviewBody]
    );
  } catch (err) {
    console.log(err.stack);
  }
};
