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
  return db.createTable('adventures', {
    id: {
      type: 'uuid',
      primaryKey: true
    },
    title: {
      type: 'string',
      notNull: true
    },
    published: {
      type: 'bool',
      notNull: true
    },
    intro: {
      type: 'json',
      notNull: true
    },
    mainStory: {
      type: 'json',
      notNull: true
    },
    items: 'json'
  });
};

exports.down = function(db) {
  return db.dropTable('adventures');
};

exports._meta = {
  version: 1
};
