const db = require("../../data/db-config");

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
async function find() {
  return await db('users').select("user_id", "username");
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
async function findBy(filter) {
  const array =  await db('users').where(filter);
  return array[0];
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
async function findById(user_id) {
  const array = await db('users').where('user_id', user_id).select("user_id", "username");
  return array[0];
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {
  const newUserId = await db('users').insert(user);
  const newUser = await db('users').where("user_id", newUserId[0]).select("user_id", "username");
  return newUser[0];
}

module.exports = {find, findBy, findById, add};