const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const allRoutes = require("./Route/userRoute.js");
const app = express();

require("dotenv").config();
require("./mysqlconnect.js");

// MIDDLE WARE
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// ROUTE
app.use("/", allRoutes);

// LISTINING SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running on the port 3000");
});
