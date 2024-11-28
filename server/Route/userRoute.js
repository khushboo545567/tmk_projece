const express = require("express");
const router = express.Router();
const signupRoute = require("../controllers/signupHandller.js");
const  loginRoute = require("../controllers/loginHandler.js");
const verifyUser = require("../middleware/verifyUser.js");
const taskRoute = require("../controllers/taskHandler.js");
const getTask = require("../controllers/getTask.js");
const deleteTask = require("../controllers/deleteTask.js");


router.post("/signup", signupRoute);
router.post("/login",loginRoute);
router.post("/task",verifyUser,taskRoute);
router.get('/task',verifyUser,getTask);
router.delete('/task/:id',verifyUser,deleteTask);


module.exports = router;
