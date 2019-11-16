const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: process.env.ELASTICSEARCH_URL });
const { convertFromRaw } = require('draft-js');
const getGenres = require('../db/queries/getGenres');

async function pushAdventureToElasticSearch({
  id,
  title,
  published,
  blurb,
  storyParts,
  coverImage,
  genreId,
}) {
  const adventure = {
    id,
    title,
    published,
    blurb: convertFromRaw(blurb).getPlainText(),
    storyParts: Object.values(storyParts).reduce(
      (acc, cur) => acc + '\n' + convertFromRaw(cur.plot).getPlainText(),
      ''
    ),
    coverImage,
    genreId,
  };

  return client
    .index({
      index: 'adventures',
      body: adventure,
    })
    .catch(err => console.error(err));
}

let genreCache;
async function searchAdventures({ size, from, searchString, sort, genres }) {
  let bool = {
    must:
      searchString && searchString.trim()
        ? {
            match: {
              title: searchString,
            },
          }
        : { match_all: {} },
  };

  if (Array.isArray(genres) && genres.length) {
    genreCache = genreCache || (await getGenres());
    const genreIds = genres.map(genre => genre.id);
    bool = {
      ...bool,
      must_not: genreCache
        .filter(genre => genreIds.indexOf(genre.id) < 0)
        .map(genre => ({ match: { genreId: genre.id } })),
    };
  }

  return client
    .search({
      index: 'adventures',
      body: {
        _source: ['id'],
        query: {
          bool,
        },
      },
      from,
      size,
      sort,
    })
    .then(res => ({
      adventureIds: res.body.hits.hits.map(hit => hit._source.id),
      hasNextPage: res.body.hits.total.value > from + size,
    }));
}

module.exports = { pushAdventureToElasticSearch, searchAdventures };
