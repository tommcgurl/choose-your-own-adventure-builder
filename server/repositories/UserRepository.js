const db = require('../db');
const mockUsers = require('../mock_data/mockUsers');

// const users = [];

class UserRepository {
  static async getUserByProviderId(provider, providerId) {
    // return users.find(
    //   u => u.provider === provider && u.providerId === providerId
    // );

    try {
      const res = await db.query(
        `
        SELECT
          id
          ,username
          ,provider
          ,providerid
        FROM users
        WHERE 
          provider = $1
          AND providerid = $2
      `,
        [provider, providerId]
      );
      return res.rows[0];
    } catch (err) {
      console.log('me');
      console.log(err.stack);
    }
  }

  static async createUser(provider, providerId, displayName) {
    // const user = {
    //   id: 'some id',
    //   displayName,
    //   provider,
    //   providerId,
    // };
    // users.push(user);
    try {
      const res = await db.query(
        `
        INSERT INTO users(username, provider, providerid)
        VALUES($1, $2, $3)
        RETURNING
          id
          ,username
          ,provider
          ,providerid
      `,
        [displayName, provider, providerId]
      );
      return res.rows[0];
    } catch (err) {
      console.log(err.stack);
    }
  }

  static getUsersByIds(ids) {
    return mockUsers.filter(u => ids.indexOf(u.id.toString()) >= 0);
  }

  static async getUser(id) {
    // return mockUsers.filter(u => u.id.toString() === id.toString());
    try {
      const res = await db.query(
        `
        SELECT
          id
          ,username
          ,provider
          ,providerid
        FROM users
        WHERE 
          id = $1
      `,
        [id]
      );
      return res.rows[0];
    } catch (err) {
      console.log(err.stack);
    }
  }
}

module.exports = UserRepository;
