const db = require('../index');

module.exports = async function(userId) {
  const client = await db.connect();

  const adventuresPromise = client.query(
    `
    SELECT
      id
      ,title
      ,published
      ,intro
      ,main_story as "mainStory"
      ,items
      ,genre_id as "genreId"
      ,cover_image as "coverImage"
    FROM adventures as a
    JOIN adventure_readers as ar ON a.id = ar.adventure_id
    WHERE 
      ar.user_id = $1;
  `,
    [userId]
  );

  const progressionsPromise = client.query(
    `
    SELECT
      adventure_id as "adventureId"
      ,progress
    FROM adventure_readers
    WHERE 
      user_id = $1;
  `,
    [userId]
  );

  return Promise.all([adventuresPromise, progressionsPromise])
    .then(results => results.map(queryResult => queryResult.rows))
    .catch(err => {
      console.log(err.stack);
      return [[], []];
    })
    .finally(() => client.release());
};
