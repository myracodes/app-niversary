const express = require("express");
const router = express.Router();
const BirthdayModel = require("./../models/birthdays");
const GiftModel = require("./../models/gifts");
const fileUploader = require("./../config/cloudinary");
const protectPrivateRoute = require("../middlewares/protectPrivateRoute");

// BIRTHDAYS DASHBOARD
router.get("/birthdays", protectPrivateRoute, (req, res, next) => {
  BirthdayModel.find()
    .populate("gifts")
    .sort("birthdayMonth")
    .sort("birthdayDay")
    .then((birthdays) => {
      res.render("birthdays.hbs", {
        birthdays,
      });
    })
    .catch((error) => {
      console.log(error, "error with tag enregistrement");
    });
});

// CREATE BIRTHDAY
router.get("/birthday/create", protectPrivateRoute, (req, res, next) => {
  GiftModel.find()
    .then((gifts) => {
      res.render("birthday_create.hbs", {
        gifts,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  // console.log('-------------post create GET');
});

router.post(
  "/birthday/create",
  fileUploader.single("picture"),
  async (req, res, next) => {
    console.log("-------------POST create");
    const newBirthday = {
      ...req.body,
    };
    if (!req.file) newBirthday.picture = undefined;
    else newBirthday.picture = req.file.path;
    try {
      await BirthdayModel.create(newBirthday);
      console.log(newBirthday);
      console.log("birthday successfully created :D");
      res.redirect("/birthdays");
    } catch (err) {
      next(err);
      res.render("error.hbs");
    }
  }
);

// UPDATE BIRTHDAY

router.get("/birthday/:id/edit", protectPrivateRoute, (req, res, next) => {
  GiftModel.find()
    .then((allGifts) => {
        console.log(allGifts);
      BirthdayModel.findByIdAndUpdate(req.params.id)
        .populate("gifts")
        .then((birthday) => {
          console.log(birthday);
          res.render("birthday_edit.hbs", { birthday, allGifts });
        })
        .catch((err) => {
          console.log(err);
        });
    })

    .catch((error) => {
      console.log(error);
    });
});

// router.get("/birthday/:id/edit", protectPrivateRoute, (req, res, next) => {
//   GiftModel.find()
//     .then((gifts) => {
//         console.log(gifts);
//       res.render("birthday_edit.hbs", {
//         gifts,
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

router.post(
  "/birthday/:id/edit",
  fileUploader.single("picture"),
  (req, res, next) => {
    const newBirthday = {
      ...req.body,
    };
    // if (!req.file) newBirthday.picture = undefined;
    // else newBirthday.picture = req.file.path;
    if (req.file) newBirthday.picture = req.file.path;
    BirthdayModel.findByIdAndUpdate(req.params.id, newBirthday)
      .then(() => {
        console.log("UPDATE SUCCESSFUL");
        res.redirect("/birthdays");
      })
      .catch((err) => {
        res.render("/birthday/:id/edit");
        console.log("ERROR WITH THE UPDATE");
        console.log(err);
      });
  }
);

// DELETE BIRTHDAY
router.post("/birthday/:id/delete", (req, res, next) => {
  BirthdayModel.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("birthday card deleted");
      res.redirect("/birthdays");
    })
    .catch((err) => {
      console.log(err);
    });
});

//SPECIFIC BIRTHDAY DETAILS
router.get("/birthday/details/:id", protectPrivateRoute, (req, res, next) => {
  BirthdayModel.findById(req.params.id)
    .populate("gifts")
    .then((birthday) => {
      res.render("birthday_details.hbs", {
        birthday,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
