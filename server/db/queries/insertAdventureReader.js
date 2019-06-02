const db = require('../index');

module.exports = async function(adventureId, readerId) {
  try {
    await db.query(
      `
      INSERT INTO adventure_readers(user_id, adventure_id)
      VALUES($1, $2);
    `,
      [readerId, adventureId]
    );
  } catch (err) {
    console.log(err.stack);
  }
};
