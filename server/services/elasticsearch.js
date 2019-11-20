const { Client } = require('@elastic/elasticsearch');
const { convertFromRaw } = require('draft-js');
const getGenres = require('../db/queries/getGenres');
const getAdventurePopularity = require('../db/queries/getAdventurePopularity');
const getAdventureRating = require('../db/queries/getAdventureRating');
const db = require('../db/index');

const client = new Client({ node: process.env.ELASTICSEARCH_URL });

const ADVENTURES_INDEX = 'adventures';

function convertAdventureForIndex({
  id,
  title,
  published,
  blurb,
  storyParts,
  genre,
  genreId,
  popularity,
  rating,
}) {
  return {
    id,
    title,
    published,
    blurb: convertFromRaw(blurb).getPlainText(),
    storyParts: Object.values(storyParts).reduce(
      (acc, cur) => acc + '\n' + convertFromRaw(cur.plot).getPlainText(),
      ''
    ),
    genreId: (genre && genre.id) || genreId,
    popularity: popularity || 0,
    rating: rating || null,
  };
}

async function createAdventureIndex() {
  try {
    await client.indices.create({
      index: ADVENTURES_INDEX,
      body: {
        mappings: {
          properties: {
            blurb: {
              type: 'text',
            },
            genreId: {
              type: 'long',
            },
            id: {
              type: 'text',
            },
            popularity: {
              type: 'long',
            },
            published: {
              type: 'date',
            },
            rating: {
              type: 'float',
            },
            storyParts: {
              type: 'text',
            },
            title: {
              type: 'text',
            },
          },
        },
      },
    });
  } catch (err) {
    console.log(err.stack);
  }
}

function pushAdventureToElasticSearch(adventure) {
  const body = convertAdventureForIndex(adventure);

  return client
    .index({
      index: ADVENTURES_INDEX,
      id: adventure.id,
      body,
    })
    .catch(err => console.error(err));
}

async function seedAdventureIndex() {
  try {
    const res = await db.query(
      `
      SELECT
        a.id
        ,a.title
        ,a.published
        ,a.blurb
        ,a.first_part_id as "firstPartId"
        ,a.story_parts as "storyParts"
        ,a.items
        ,a.genre_id as "genreId"
        ,a.cover_image as "coverImage"
        ,COUNT(r.adventure_id) AS popularity
        ,TO_CHAR(AVG(ar.rating), '9.9') AS rating
      FROM adventures AS a
      LEFT JOIN adventure_readers AS r ON r.adventure_id = a.id
      LEFT JOIN adventure_reviews AS ar ON ar.adventure_id = a.id
      GROUP BY a.id
    `
    );
    await client.bulk({
      index: ADVENTURES_INDEX,
      body: res.rows.reduce(
        (acc, cur) =>
          acc +
          `${JSON.stringify({
            index: { _index: ADVENTURES_INDEX, _id: cur.id },
          })}\n${JSON.stringify(convertAdventureForIndex(cur))}\n`,
        ''
      ),
    });
  } catch (err) {
    console.log(err.stack);
  }
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
      index: ADVENTURES_INDEX,
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

async function updatePopularity(id) {
  const res = await client.getSource({ id, index: ADVENTURES_INDEX });
  const popularity = await getAdventurePopularity(id);

  return client
    .index({
      index: ADVENTURES_INDEX,
      id,
      body: { ...res.body, popularity },
    })
    .catch(err => console.error(err));
}

async function updateRating(id) {
  const res = await client.getSource({ id, index: ADVENTURES_INDEX });
  const rating = await getAdventureRating(id);
  return client
    .index({
      index: ADVENTURES_INDEX,
      id,
      body: { ...res.body, rating },
    })
    .catch(err => console.error(err));
}

module.exports = {
  createAdventureIndex,
  pushAdventureToElasticSearch,
  searchAdventures,
  updatePopularity,
  updateRating,
  seedAdventureIndex,
};
