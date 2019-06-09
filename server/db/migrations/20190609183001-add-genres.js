'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db
    .createTable('genres', {
      id: {
        type: 'serial',
        primaryKey: true,
      },
      name: {
        type: 'string',
        notNull: true,
      },
    })
    .then(() => {
      db.runSql(`
    INSERT INTO genres(name)
    VALUES
      ('Action/Adventure'),
      ('Fantasy'),
      ('Historical Fiction'),
      ('Horror'),
      ('Mystery/Thriller'),
      ('Romance'),
      ('Sci-Fi')
    `);
    });
};

exports.down = function(db) {
  return db.dropTable('genres');
};

exports._meta = {
  version: 1,
};
