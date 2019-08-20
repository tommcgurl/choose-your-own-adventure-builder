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
    .addColumn('genres', 'description', {
      type: 'string',
    })
    .then(() => {
      db.runSql(`
      UPDATE genres
      SET description = 'Action/Adventure stories typically involve the larger than life exploits of an individual or team of specialists. Plots may have fantastical elements but are always grounded in reality. Common themes include: covert military operations; treasure hunting; daring escapes/breakouts; gun fighting and/or explosions; plane/train/automobile chases.'
      WHERE name = 'Action/Adventure';
      UPDATE genres
      SET description = 'Fantasy adventures are set in other mystical worlds or places and traditionally imagine the existence of all manner of different races, such as (but not limited to) Elves, Orcs, Dwarves, Gnomes, etc. Magic plays a large role in Fantasy adventures, and the world of Fantasy borrows heavily from the medieval era. Often rooted in myth, legend, and folklore, plots typically involve great heroes, villains that are pure manifestations of evil, bands of disparate folk coming together for a common cause, and dragons probably.'
      WHERE name = 'Fantasy';
      UPDATE genres
      SET description = 'Historical Fiction is a genre in which stories take place in the past and are rooted in reality. The characters and events may be fictitious or may be based on real history, but the plot itself is pure fiction. Historical authenticity is a major element in these adventures, and the plot typically takes place at least 25 years in the past. Examples: You must navigate upstairs and downstairs life as a servant on an English estate in the Edwardian era; You are a refugee in WW2 era Europe searching for your lost family; During the American Civil War, you are the owner of a house in which two injured soldiers are convalescing and quickly becoming friends, neither yet aware that they are enemies.'
      WHERE name = 'Historical Fiction';
      UPDATE genres
      SET description = 'The Horror genre is replete with tales of the macabre. Oftentimes supernatural in nature, the purpose of these adventures is to invoke terror in the reader. Whether you are being chased by an insane killer, haunted by a vengeful poltergeist, or possessed by a demon, adventures in the Horror genre ratchet up tension with each choice you make and use your fear against you. Common elements include: blood/gore/body horror; ghosts, poltergeists, or demons; zombies, werewolves, vampires, and other supernatural beings.'
      WHERE name = 'Horror';
      UPDATE genres
      SET description = 'Adventures in this genre are typically based around law enforcement, intelligence agencies, and criminal activity. You will likely be trying to solve a murder, catch the leader of an international crime syndicate, or work from the inside to save hostages from a group of terrorists that have taken over a corporate business building on Christmas Eve. Common themes include: murder, kidnapping, or missing persons; espionage, sometimes involving military intelligence; high-profile criminal activity, such as organized crime.'
      WHERE name = 'Mystery/Thriller';
      UPDATE genres
      SET description = 'Romance adventures will likely put the reader in the position of courting or being courted (or both!). Plots can involve elements from other genres, but the focus is always on finding love and navigating the ups and downs of romantic relationships. Choices may positively or negatively affect how prospective lovers feel about you, and surely heartbreak will be a common stepping stone on your path to bliss.'
      WHERE name = 'Romance';
      UPDATE genres
      SET description = 'Science Fiction, or "Sci-Fi", adventures take place in the future and they usually involve advanced technology, faster-than-light space travel, utopian/dystopian socities, alien races, multi-planetary civilizations, and/or time travel. Sci-Fi stories contain speculation about future technologies as logical extrapolations from current technology or technological trends, and often attempt to attach scientific possibility to currently impossible concepts or theories. When embarking on a Sci-Fi adventure, you may likely be: the captain of a salvage ship exploring the edges of known space who has a run-in with hostile aliens; a digital avatar on a mission inside a virtual world, the outcome of which will determine the fate of the real world; an android, devoid of emotion, seeking to become more human and give yourself true purpose in your world.'
      WHERE name = 'Sci-Fi';
    `);
    })
    .then(() => {
      db.changeColumn('genres', 'description', { notNull: true });
    });
};

exports.down = function(db) {
  return db.removeColumn('genres', 'description');
};

exports._meta = {
  version: 1,
};
