import * as Settings from "../models/settings.model.js";

export async function requireAdmin(req, res, next) {
  const row = await Settings.get(req.user.id, "isAdmin");
  const isAdmin = row ? JSON.parse(row.value) === true : false;

  if (!isAdmin) return res.status(403).json({ error: "Admin only" });
  next();
}
