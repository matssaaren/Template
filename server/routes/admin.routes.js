import { Router } from "express";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

// Helper: get real table names from SQLite
async function getAllTables() {
  const rows = await db("sqlite_master")
    .select("name")
    .where({ type: "table" })
    .andWhere("name", "not like", "sqlite_%")
    .orderBy("name", "asc");

  return rows.map((r) => r.name);
}

// GET /api/admin/tables
router.get("/tables", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const tables = await getAllTables();
    res.json({ tables });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/tables/:table
router.get("/tables/:table", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const table = req.params.table;

    // IMPORTANT: whitelist from actual DB tables to prevent SQL injection
    const tables = await getAllTables();
    if (!tables.includes(table)) {
      return res.status(404).json({ error: "Table not found" });
    }

    // optional: add a limit so you don't nuke your browser
    const rows = await db(table).select("*").limit(500);

    res.json({ table, rows });
  } catch (err) {
    next(err);
  }
});

export default router;
