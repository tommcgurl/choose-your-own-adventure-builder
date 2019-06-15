const db = require('../index');

module.exports = async function(draftId, authorId) {
  try {
    const res = await db.query(
      `
      DELETE 
      FROM adventures
      WHERE
          published IS NULL
          AND id = $1
          AND EXISTS (
              SELECT user_id
              FROM adventure_authors
              WHERE
                  adventure_id = $1
                  AND user_id = $2);
      `,
      [draftId, authorId]
    );
    return Boolean(res.rowCount);
  } catch (err) {
    console.log(err.stack);
  }
};
