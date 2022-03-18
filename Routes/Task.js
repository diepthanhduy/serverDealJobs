const express = require("express");
const router = express.Router();

const Task = require("../Models/Task");

// Trả về tất cả Task hiện có trong DB
router.get("/", async (req, res) => {
  try {
    const data = await Task.find({});
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

//Thêm một Task mới vào DB
router.post("/", async (req, res) => {
  const task = new Task({
    Name: req.body.Name,
    Description: req.body.Description,
    Picture: req.body.Picture,
    Price: req.body.Price,
    //Tự động tạo để test API hoàn thành chỉnh lại
    IDUser: "62348b9b576c3e4345f89502",
    IDCategory: "6232090b39d30d71ef40ff6c",
  });
  try {
    const saveTask = await task.save();
    res.json(saveTask);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
