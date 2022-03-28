const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  FullName: String,
  UserName: String,
  PassWord: String,
  Phone: {
    type: String,
    default: "",
  },
  Address: String,
  public_id: {
    type: String,
    default: "unp3nb7epsqnakmo2nod",
  },
  Picture: {
    type: String,
    default:
      "https://res.cloudinary.com/dtd377/image/upload/v1647939596/unp3nb7epsqnakmo2nod.png",
  },
  Description: {
    type: String,
    default: "",
  },
  StatusDone: {
    type: Number,
    default: 0,
  },
  StatusNeedTask: {
    type: Number,
    default: 0,
  },
  ExpectedPrice: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Users", UserSchema, "User");
