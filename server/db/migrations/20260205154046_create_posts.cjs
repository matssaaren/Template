/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('posts', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('content').notNullable();
        table.integer('author_id').unsigned().notNullable();
        table.foreign('author_id').references('id').inTable('users').onDelete('CASCADE');
        table.boolean('is_deleted').defaultTo(false);
        table.timestamps(true, true);
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('posts');
  
};
