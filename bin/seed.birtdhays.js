require("dotenv").config();
require("../config/mongodb");
const BirthdayModel = require("../models/birthdays")

const someBirthdays = [
  { friendName: "Lionel", friendLastName: "Messi", birthday: 1987 - 06 - 24 },
  { friendName: "Antonio", friendLastName: "Valencia", birthday: 1985 - 08 - 04 },
];

BirthdayModel.create(someBirthdays)
.then((birthday)=>{
    console.log("NEW BIRTHDAYS CREATED!!!", birthday);
})
.catch((error)=>{
    console.log("NEW ERROR", error);
})

