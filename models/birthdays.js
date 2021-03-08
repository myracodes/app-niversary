const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const birthdaySchema = new Schema({
  friendName: String,
  friendLastName: String,
  birthday: Date,
  picture: {
    type: String,
    default:
      "https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png",
  },
  gift: [
    {
      type: Schema.Types.ObjectId,
      ref: "gifts"
    },
  ],
});

const BirthdayModel = mongoose.model("birthdays", userSchema);

module.exports = BirthdayModel;