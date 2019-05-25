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
  return db.createTable('adventure_authors', {
    user_id: {
      type: 'int',
      primaryKey: true,
      notNull: true,
      foreignKey: {
        name: 'adventure_authors_users_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    adventure_id: {
      type: 'uuid',
      primaryKey: true,
      notNull: true,
      foreignKey: {
        name: 'adventure_authors_adventures_id_fk',
        table: 'adventures',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
  });
};

exports.down = function(db) {
  return db.dropTable('adventure_authors');
};

exports._meta = {
  version: 1,
};
