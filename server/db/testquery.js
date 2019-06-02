const db = require('./index');

(async function() {
  const res = await db.query(
    `
    SELECT
      id
      ,title
      ,published
      ,intro
      ,main_story
      ,items
    FROM adventures
    ORDER BY published DESC
    LIMIT 2;

    SELECT
      *
    FROM users;
  `
  );
  console.log(res[0].rows);
  console.log(res[1].rows);
})();
