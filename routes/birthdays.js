const express = require('express');
const router = express.Router();
const BirthdayModel = require('./../models/birthdays');
// const GiftModel = require('./../models/gifts');
const fileUploader = require('./../config/cloudinary');

// BIRTHDAYS DASHBOARD
router.get('/birthdays', (req, res, next) => {
    BirthdayModel.find()
        .then((birthdays) => {
            res.render('birthdays.hbs', {
                birthdays
            });
        })
        .catch((error) => {
            console.log(error, 'error with tag enregistrement');
        });
});

// CREATE BIRTHDAY
router.get("/birthday/create", (req, res, next) => {
    res.render("birthday_create.hbs");
    console.log('-------------post create GET');
});

router.post("/birthday/create", fileUploader.single('picture'), async (req, res, next) => {
    console.log('-------------POST create');
    const newBirthday = {
        ...req.body
    };
    if (!req.file) newBirthday.picture = undefined;
    else newBirthday.picture = req.file.path;
    try {
        await BirthdayModel.create(newBirthday);
        console.log("birthday successfully created :D");
        res.redirect("/birthdays");
    } catch (err) {
        next(err);
        res.render("error.hbs");
    }
});

// UPDATE BIRTHDAY
router.get("/birthday/edit", (req, res, next) => {
    res.render("birthday_edit.hbs");
});

module.exports = router;