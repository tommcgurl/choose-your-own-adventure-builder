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
    .runSql('DELETE FROM users')
    .then(() => db.removeColumn('users', 'provider'))
    .then(() => db.removeColumn('users', 'provider_id'))
    .then(() =>
      db.changeColumn('users', 'username', {
        type: 'string',
        notNull: true,
        unique: true,
      })
    )
    .then(() =>
      db.createTable('auth_provider_info', {
        provider: {
          type: 'string',
          primaryKey: true,
          notNull: true,
        },
        provider_id: {
          type: 'string',
          primaryKey: true,
          notNull: true,
        },
        user_id: {
          type: 'int',
          notNull: true,
          foreignKey: {
            name: 'auth_provider_info_users_id_fk',
            table: 'users',
            rules: {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT',
            },
            mapping: 'id',
          },
        },
      })
    );
};

exports.down = function(db) {
  return db
    .dropTable('auth_provider_info')
    .then(() =>
      db.changeColumn('users', 'username', {
        type: 'string',
        notNull: true,
        unique: false,
      })
    )
    .then(() =>
      db.addColumn('users', 'provider', {
        type: 'string',
        notNull: true,
      })
    )
    .then(() =>
      db.addColumn('users', 'provider_id', {
        type: 'string',
        notNull: true,
      })
    );
};

exports._meta = {
  version: 1,
};
