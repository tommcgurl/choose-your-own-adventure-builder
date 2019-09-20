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
  return db.createTable('adventure_reviews', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    adventure_id: {
      type: 'uuid',
      notNull: true,
      foreignKey: {
        name: 'adventure_reviews_adventures_id_fk',
        table: 'adventures',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    user_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'adventure_reviews_users_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    rating: {
      type: 'int',
      notNull: true,
    },
    headline: {
      type: 'string',
      notNull: true,
    },
    review: {
      type: 'string',
      notNull: true,
    },
  });
};

exports.down = function(db) {
  return db.dropTable('adventure_reviews');
};

exports._meta = {
  version: 1,
};
