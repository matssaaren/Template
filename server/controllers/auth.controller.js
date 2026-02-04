import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as Users from "../models/users.model.js";
import * as Settings from "../models/settings.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_EXPIRES = "7d";

export async function register(req, res, next) {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ error: "email, name, password required" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const user = await Users.create({ email, name, password_hash });

    // optional: auto-login after register
    const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    res.status(201).json({ user: safeUser(user), token });
  } catch (err) {
    // handle unique email conflict similarly as before
    if (String(err?.message || "").includes("UNIQUE")) {
      return res.status(409).json({ error: "Email already exists" });
    }
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password required" });

    const user = await Users.getByEmail(email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.json({ user: safeUser(user), token });
  } catch (err) {
    next(err);
  }
}

function safeUser(user) {
  const { password_hash, ...rest } = user;
  return rest;
}

export async function me(req, res, next) {
  try {
    const user = await Users.getById(req.user.id);
    if (!user) return res.status(401).json({ error: "User not found" });

    // remove password_hash before returning
    const { password_hash, ...safeUser } = user;

    // admin flag from user_settings (value stored as JSON string)
    const row = await Settings.get(user.id, "isAdmin");
    const isAdmin = row ? JSON.parse(row.value) === true : false;

    res.json({ user: safeUser, isAdmin });
  } catch (err) {
    next(err);
  }
}