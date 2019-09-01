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
    .runSql('DELETE FROM adventures')
    .then(() => db.renameColumn('adventures', 'intro', 'blurb'))
    .then(() => db.renameColumn('adventures', 'main_story', 'story_parts'))
    .then(() =>
      db.addColumn('adventures', 'first_part_id', { type: 'string' })
    );
};

exports.down = function(db) {
  return db
    .runSql('DELETE FROM adventures')
    .then(() => db.removeColumn('adventures', 'first_part_id'))
    .then(() => db.renameColumn('adventures', 'story_parts', 'main_story'))
    .then(() => db.renameColumn('adventures', 'blurb', 'intro'));
};

exports._meta = {
  version: 1,
};
