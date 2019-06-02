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
  return db.removeColumn('adventures', 'published').then(() =>
    db.addColumn('adventures', 'published', {
      type: 'timestamp',
    })
  );
};

exports.down = function(db) {
  return db
    .removeColumn('adventures', 'published')
    .then(() => db.runSql('DELETE FROM adventures;'))
    .then(() =>
      db.addColumn('adventures', 'published', {
        type: 'bool',
        notNull: true,
      })
    );
};

exports._meta = {
  version: 1,
};
