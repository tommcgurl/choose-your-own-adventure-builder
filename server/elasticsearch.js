const fetch = require("node-fetch");
const { convertFromRaw } = require("draft-js");

async function pushAdventureToElasticSearch(adventure) {
  adventure = {
    id: adventure.id,
    title: adventure.title,
    published: adventure.published,
    blurb: convertFromRaw(adventure.blurb).getPlainText(),
    storyParts: Object.values(adventure.storyParts).reduce(
      (acc, cur) => acc + "\n" + convertFromRaw(cur.plot).getPlainText(),
      ""
    ),
    genreId: adventure.genreId,
    coverImage: adventure.coverImage,
  };

  return fetch(`http://localhost:9200/adventures/_doc/${adventure.id}`, {
    method: "PUT",
    body: JSON.stringify(adventure),
    headers: { "Content-Type": "application/json" },
  }).catch(err => console.error(err));
}

async function searchAdventures(search) {
  const { take, publishedBefore, searchString, genres } = search;

  const query = {
    match: {
      title: {
        query: searchString,
      },
    },
  };
  return fetch(`http://localhost:9200/adventures/_doc/${adventure.id}`, {
    method: "PUT",
    body: JSON.stringify({ query }),
    headers: { "Content-Type": "application/json" },
  }).catch(err => console.error(err));
}

module.exports = { pushAdventureToElasticSearch, searchAdventures };
