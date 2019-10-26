const db = require('../index');

module.exports = async function(updatedReview) {
  const { id, rating, headline, reviewBody } = updatedReview;
  try {
    const res = await db.query(
      `
      UPDATE adventure_reviews
      SET
        rating = $1
        ,headline = $2
        ,review = $3
      WHERE 
        id = $4
      RETURNING
        id
        ,adventure_id as "adventureId"
        ,user_id as "userId"
        ,rating
        ,headline
        ,review as "reviewBody"
    `,
      [rating, headline, reviewBody, id]
    );
    return Boolean(res.rowCount);
  } catch (err) {
    console.log(err.stack);
  }
};
