const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/daax22fpi/image/upload/c_limit,e_blue:0,h_200,q_80,r_8,w_200/a_0/v1615216912/App-niversary/open-default-profile-picture-png_hz8bo3.png",
  },
  bdaycard: [{ type: Schema.Types.ObjectId, ref: "birthdays" }],
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
