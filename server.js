const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

// 🔹 GET all courses
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

// 🔹 ADD a course
app.post("/addcourse", async (req, res) => {
  const { title, description, duration } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      "INSERT INTO courses (title, description, duration) VALUES (?, ?, ?)",
      [title, description, duration]
    );
    await connection.end();
    res.json({ message: "Course added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 UPDATE a course
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
    res.json({ message: "Course updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 DELETE a course
app.delete("/courses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute("DELETE FROM courses WHERE id=?", [id]);
    await connection.end();
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
