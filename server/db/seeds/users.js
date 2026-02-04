/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require('bcrypt');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  const hash = await bcrypt.hash("123", 10);
  
  await knex('users').insert([
    {id: 1, email: 'admin@example.com', name: 'ADMIN', password_hash: hash},
    {id: 2, email: 'user1@example.com', name: 'User One', password_hash: hash},
    {id: 3, email: 'user2@example.com', name: 'User Two', password_hash: hash},
    {id: 4, email: 'user3@example.com', name: 'User Three', password_hash: hash}
  ]);
};
