// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors({
  origin: "https://mini-crm-gino.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/companies", require("./routes/companyRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

// POST - Create Lead
const Lead = require("./models/Lead");

// POST route
app.post("/leads", async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/leads", async (req, res) => {
  try {
    const leads = await Lead.find({ isDeleted: false });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const Company = require("./models/Company");

app.get("/companies", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const Task = require("./models/Task");

// GET all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST task
app.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // TEMP login
  if (email === "gino@test.com" && password === "123456") {
    return res.json({ token: "dummy-token" });
  }

  res.status(400).json({ msg: "Invalid credentials" });
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});