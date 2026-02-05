import * as Posts from "../models/post.model.js";

export async function list(req, res, next) {
  try {
    const rows = await Posts.list();
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const row = await Posts.getById(id);
    if (!row) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(row);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const { title, content, author_id } = req.body;
    const row = await Posts.create({ title, content, author_id });
    res.status(201).json(row);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body;
    const row = await Posts.update(id, { title, content });
    if (!row) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(row);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    const success = await Posts.remove(id);
    if (!success) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

