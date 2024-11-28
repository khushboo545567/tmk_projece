const bcrypt = require("bcrypt");
const db = require("../mysqlconnect.js");
const saltRounds = 10;

const signupRoute = (req,res) => {
    const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Password hashing failed" });
    }

    const sql = "INSERT INTO worker (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hash], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Email already exists" });
        }
        console.error("Database insertion error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  });
}

module.exports= signupRoute;