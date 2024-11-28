const db = require("../mysqlconnect.js");
require("../middleware/verifyUser.js");

const getTask = (req, res) => {
  const userId = req.worker_id;
  const sql = "SELECT * FROM task WHERE worker_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Database error :", err);
      return res.status(500).json({ error: "can not get error" });
    }
    res.status(200).json({result});
  });
};

module.exports = getTask;
