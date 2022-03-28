const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const tasksRoute = require("./Routes/Task");
const userRoute = require("./Routes/User");

//Sử dụng body-parser để lấy được json từ req
app.use(bodyParser.json());

//Route api
app.use("/taskApi", tasksRoute);
app.use("/user", userRoute);

//Chạy app tại port 3000
app.listen(3000);

//Connect DB
connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/appDealJobs");
    console.log("Connected to DB success!");
  } catch (error) {
    console.log("Connect fail: " + error);
  }
};
connectDB();
