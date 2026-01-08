const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
app.use(express.json());

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

// =====================
// GET all courses
// =====================
app.get("/courses", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM courses");
    await connection.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// POST add course
// =====================
app.post("/addcourse", async (req, res) => {
  const { title, description, duration } = req.body;

  if (!title || !description || !duration) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      "INSERT INTO courses (title, description, duration) VALUES (?, ?, ?)",
      [title, description, duration]
    );
    await connection.end();
    res.json({ message: "Course added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// PUT update course
// =====================
app.put("/courses/:id", async (req, res) => {
  const { title, description, duration } = req.body;
  const { id } = req.params;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      "UPDATE courses SET title=?, description=?, duration=? WHERE id=?",
      [title, description, duration, id]
    );
    await connection.end();
    res.json({ message: "Course updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// DELETE course
// =====================
app.delete("/courses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      "DELETE FROM courses WHERE id=?",
      [id]
    );
    await connection.end();
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
