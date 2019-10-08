const db = require('../index');

module.exports = async function(reviewId) {
  try {
    const res = db.query(
      `
        DELETE FROM adventure_reviews
        WHERE id = $1
      `,
      [reviewId]
    );
    return Boolean(res.rowCount);
  } catch (err) {
    console.log(err.stack);
  }
};
