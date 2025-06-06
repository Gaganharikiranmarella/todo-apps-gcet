import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import todoRoutes from "./routes/todoRoutes.js"; // Adjust path if needed

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

app.use("/api/todos", todoRoutes); // Mount the routes

app.get("/", (req, res) => res.send("Todo API is running"));

app.listen(8080, () => {
  console.log("🚀 Server running on http://localhost:8080");
});
