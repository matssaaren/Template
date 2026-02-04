import db from "../db.js";

// returns rows like: [{ id, user_id, key, value, ... }]
export function listForUser(userId) {
  return db("user_settings")
    .where({ user_id: userId })
    .select("*")
    .orderBy("key", "asc");
}

export function get(userId, key) {
  return db("user_settings").where({ user_id: userId, key }).first();
}

/**
 * SQLite-friendly upsert.
 * Requires UNIQUE(user_id, key) in your migration.
 */
export async function upsert(userId, key, value) {
  const valueStr = JSON.stringify(value);

  // insert or update
  await db("user_settings")
    .insert({ user_id: userId, key, value: valueStr })
    .onConflict(["user_id", "key"])
    .merge({ value: valueStr, updated_at: db.fn.now() });

  return db("user_settings").where({ user_id: userId, key }).first();
}
