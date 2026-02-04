import db from "../db.js";

export function getByEmail(email) {
  return db("users").where({ email }).first();
}

export function getById(id) {
  return db("users").where({ id }).first();
}

export async function create({ email, name, password_hash }) {
  const [id] = await db("users").insert({ email, name, password_hash });
  return db("users").where({ id }).first();
}
