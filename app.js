const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Serve static files from the 'client' folder
app.use(express.static(path.join(__dirname, "../client")));

// Route to serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

// MongoDB Connection
mongoose.connect("mongodb+srv://tejaswinishine1012:Teju1012@cluster0.hiwvz55.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Expense Schema
const ExpenseSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    category: String
});

const Expense = mongoose.model("expense", ExpenseSchema);

// API Routes
app.get("/expenses", async (req, res) => {
    const expenses = await Expense.find();
    res.json(expenses);
});

app.post("/expenses", async (req, res) => {
    const { name, amount, category } = req.body;
    const expense = new Expense({ name, amount, category });
    await expense.save();
    res.json({ message: "Expense added!" });
});

app.delete("/expenses/:id", async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted!" });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
