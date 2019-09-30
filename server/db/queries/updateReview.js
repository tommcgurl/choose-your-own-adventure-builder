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
        ,adventure_id
        ,user_id
        ,rating
        ,headline
        ,review as "reviewBody"
    `,
      [rating, headline, reviewBody, id]
    );
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};
