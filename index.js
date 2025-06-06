import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://todo-list-gagan.vercel.app", // ✅ VERY IMPORTANT
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => res.send("Todo API running"));

app.listen(8080, () => {
  console.log("🚀 Server running on http://localhost:8080");
});
