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
    .renameColumn('users', 'providerid', 'provider_id')
    .then(() => db.renameColumn('adventures', 'mainStory', 'main_story'));
};

exports.down = function(db) {
  return db
    .renameColumn('users', 'provider_id', 'providerid')
    .then(() => db.renameColumn('adventures', 'main_story', 'mainStory'));
};

exports._meta = {
  version: 1,
};
