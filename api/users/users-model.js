const db = require("../../data/db-config");

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
async function find() {
  return await db.get('users');
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
async function findBy(filter) {
  return await db.get('users').where(filter);
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
async function findById(user_id) {
  const result = await db.get('users').where('user_id', user_id);
  return result[0];
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {
  const newUserId = await db.get('users').insert(user);
  const newUser = await db.get('users').where("users_id", newUserId[0]);
  return newUser;
}

module.exports = {find, findBy, findById, add};