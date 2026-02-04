import * as Users from "../models/users.model.js";

export async function list(req, res, next) {
  try {
    const rows = await Users.list();
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const user = await Users.getById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const { email, name } = req.body;
    if (!email || !name) return res.status(400).json({ error: "email and name required" });

    const user = await Users.create({ email, name });
    res.status(201).json(user);
  } catch (err) {
    // sqlite unique constraint example
    if (String(err?.message || "").includes("UNIQUE")) {
      return res.status(409).json({ error: "Email already exists" });
    }
    next(err);
  }
}
