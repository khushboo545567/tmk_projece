const express = require("express");
const db = require("../mysqlconnect.js");
require("../middleware/verifyUser.js");

const taskRoute = (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }
  const worker_id = req.worker_id;
  const sql = "INSERT INTO task (title,description,worker_id) VALUES (?,?,?)";
  db.query(sql, [title, description, worker_id], (err, result) => {
    if (err) {
      console.error("Database error :", err);
      return res.status(500).json({ error: "failed to add task" });
    }
    res.status(201).json({
      message: "Task added successfully"
    });
  });
};

module.exports = taskRoute;