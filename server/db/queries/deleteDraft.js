const db = require('../index');

module.exports = async function(draftId) {
  console.log('running delete query for id:', draftId);
  try {
    await db.query(
      `
        DELETE FROM adventures
        WHERE id = $1
      `,
      [draftId]
    );
  } catch (err) {
    console.log(err.stack);
  }
};
