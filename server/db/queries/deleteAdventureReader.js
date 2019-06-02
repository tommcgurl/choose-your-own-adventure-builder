const db = require('../index');

module.exports = async function(adventureId, readerId) {
  try {
    await db.query(
      `
      DELETE FROM adventure_readers
      WHERE user_id = $1 AND adventure_id = $2;
    `,
      [readerId, adventureId]
    );
  } catch (err) {
    console.log(err.stack);
  }
};
