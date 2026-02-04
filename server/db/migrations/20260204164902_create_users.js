/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("users", (t) => {
    t.increments("id").primary();
    t.text("email").notNullable().unique();
    t.text("name").notNullable();
    t.text("password_hash").notNullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());
  });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("users");
};
