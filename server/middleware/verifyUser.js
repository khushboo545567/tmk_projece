const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyUser = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ){
    token = req.headers.authorization.split(' ')[1];
  }else if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try{
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    req.worker_id = decoded.userId;
    next();
  }catch (err) {
    return res.status(401).json({ error: "Invalid token" });
    
  }
};

module.exports = verifyUser;
