const db = require('../index');

module.exports = async function(adventureId, readerId, progress) {
  progress = progress || [];
  try {
    const res = await db.query(
      `
      INSERT INTO adventure_readers(user_id, adventure_id, progress)
      VALUES($1, $2, $3)
      ON CONFLICT ON CONSTRAINT adventure_readers_pkey DO UPDATE
      SET
        progress = $3
      RETURNING progress;
    `,
      [readerId, adventureId, JSON.stringify(progress)]
    );
    return res.rows[0].progress;
  } catch (err) {
    console.log(err.stack);
    return [];
  }
};
