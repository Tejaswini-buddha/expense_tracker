const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");

// Create a new expense
router.post("/add", async (req, res) => {
    try {
      console.log("Received Data:", req.body); // Debugging log
  
      const { title, amount, category } = req.body;
      if (!title || !amount || !category) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newExpense = new Expense({ title, amount, category });
      await newExpense.save();
      res.status(201).json({ message: "Expense added successfully", newExpense });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// Get all expenses
router.get("/all", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
