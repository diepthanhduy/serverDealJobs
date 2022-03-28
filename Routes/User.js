const express = require("express");
const router = express.Router();

const User = require("../Models/User");
const cloudinary = require("../Utilities/cloudinary");

//handle login
router.post("/login", async (req, res) => {
  try {
    const data = await User.find({
      UserName: req.body.UserName,
      PassWord: req.body.PassWord,
    }).exec();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

//handle Create User
router.post("/create-user", async (req, res) => {
  const user = new User({
    FullName: req.body.FullName,
    UserName: req.body.UserName,
    PassWord: req.body.PassWord,
  });
  try {
    const data = await User.find({
      UserName: req.body.UserName,
    }).exec();
    if (data.length == 0) {
      const saveUser = await user.save();

      //Tạo một data trả về khi tạo user
      const userData = {
        _id: saveUser._id,
        FullName: saveUser.FullName,
        UserName: saveUser.UserName,
        Phone: saveUser.Phone,
        Address: saveUser.Address,
        Description: saveUser.Description,
        public_id: saveUser.public_id,
        Picture: saveUser.Picture,
        ExpectedPrice: saveUser.ExpectedPrice,
        StatusDone: saveUser.StatusDone,
        StatusNeedTask: saveUser.StatusNeedTask,
      };
      res.json(userData);
    } else {
      res.json({ message: "exist" });
    }
  } catch (error) {
    res.json({ message: error });
  }
});

//handle Update User
router.put("/update", async (req, res) => {
  if (req.body.public_id_old != undefined) {
    await cloudinary.uploader.destroy(req.body.public_id_old);
  }

  //Data cần sửa đưa vào update
  const data = {
    FullName: req.body.FullName,
    Phone: req.body.Phone,
    Address: req.body.Address,
    Picture: req.body.Picture,
    public_id: req.body.public_id,
    Description: req.body.Description,
    ExpectedPrice: req.body.ExpectedPrice,
  };

  //Update
  User.updateOne({ _id: req.body._id }, { $set: data })
    .exec()
    .then(() => {
      //Tìm user cần trả về
      const userData = User.find({
        _id: req.body._id,
      }).exec();
      return userData;
    })
    .then((resUser) => {
      const userUpdated = {
        _id: resUser[0]._id,
        FullName: resUser[0].FullName,
        UserName: resUser[0].UserName,
        Phone: resUser[0].Phone,
        Address: resUser[0].Address,
        Description: resUser[0].Description,
        public_id: resUser[0].public_id,
        Picture: resUser[0].Picture,
        ExpectedPrice: resUser[0].ExpectedPrice,
        StatusDone: resUser[0].StatusDone,
        StatusNeedTask: resUser[0].StatusNeedTask,
      };
      res.json(userUpdated);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

module.exports = router;
