import db from "../db.js";


export function list() {
  return db("posts")
    .select("posts.*", "users.name as author_name")
    .leftJoin("users", "posts.author_id", "users.id")
    .orderBy("posts.created_at", "desc");
}

export function getById(id) {
  return db("posts").where({ id }).first();
}

export async function create({ title, content, author_id }) {
  const [id] = await db("posts").insert({ title, content, author_id });
  return db("posts").where({ id }).first();
}
export async function update(id, { title, content }) {
  const affectedRows = await db("posts")
    .where({ id })
    .update({ title, content, updated_at: db.fn.now() });
    if (affectedRows === 0) {
        return null;
    }
  return db("posts").where({ id }).first();
}

export async function remove(id) {
    const affectedRows = await db("posts")
    .where({ id })
    .update({ is_deleted: true, updated_at: db.fn.now() });
    return affectedRows > 0;
}