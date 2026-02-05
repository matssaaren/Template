import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import { notFound, errorHandler } from "./middleware/error.js";


const app = express();
app.use(express.json());
app.use(cors());
app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/users", usersRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/posts", postsRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => console.log("API on http://localhost:5000"));
