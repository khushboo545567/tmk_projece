const jwt = require("jsonwebtoken");
const db = require("../mysqlconnect.js");
const cookie = require("cookie-parser");
const bcrypt = require("bcrypt");
require("dotenv").config();

const loginRoute = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sql = "SELECT * FROM worker WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: "Password comparison failed" });
      }
      if (!isMatch) {
        return res.status(400).json({ error: "invalid crediantials" });
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email},
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "strict", 
          secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ message: "Login sucessful", token,user});
    });
  });
};

module.exports = loginRoute;
