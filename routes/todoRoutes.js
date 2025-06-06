import express from "express";
import Todo from "../models/todoModel.js";

const router = express.Router();

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new todo
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text field is required" });
    }

    const newTodo = new Todo({ text });
    const saved = await newTodo.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE a todo (e.g., toggle completed)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a todo
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Deleted", id: deleted._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
