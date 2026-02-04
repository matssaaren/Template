/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_settings').del()
  
  await knex('user_settings').insert([
    { id: 1, user_id: 1, key: "isAdmin", value: JSON.stringify(true) },
  ]);
};