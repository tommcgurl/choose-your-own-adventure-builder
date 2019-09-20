const db = require('../index');

module.exports = async function(adventureId, user, reviewObj) {
  const { id, rating, headline, review } = reviewObj;
  const client = await db.connect();

  try {
    await client.query(
      `
        INSERT_INTO adventure_reviews(id, adventure_id, user_id, rating, headline, review)
        VALUES($1, $2, $3, $4, $5, $6)
      `,
      [id, adventureId, user.id, rating, headline, review]
    );
  } catch (err) {
    console.log(err.stack);
  }
};
