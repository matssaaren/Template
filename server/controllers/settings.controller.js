import * as Settings from "../models/settings.model.js";

export async function listForUser(req, res, next) {
  try {
    const userId = Number(req.params.userId);
    const rows = await Settings.listForUser(userId);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function setForUser(req, res, next) {
  try {
    const userId = Number(req.params.userId);
    const key = req.params.key;
    const { value } = req.body;

    if (value === undefined) {
      return res.status(400).json({ error: "value required" });
    }

    const row = await Settings.upsert(userId, key, value);
    res.json(row);
  } catch (err) {
    next(err);
  }
}
