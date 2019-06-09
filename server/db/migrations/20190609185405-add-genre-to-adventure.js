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
  return db.addColumn('adventures', 'genre_id', {
    type: 'int',
    foreignKey: {
      name: 'adventures_genres_id_fk',
      table: 'genres',
      rules: {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      },
      mapping: 'id',
    },
  });
};

exports.down = function(db) {
  return db.removeColumn('adventures', 'genre_id');
};

exports._meta = {
  version: 1,
};
