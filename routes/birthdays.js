const express = require('express');
const router = express.Router();

// CREATE BIRTHDAY
router.get("/birthday/create", (req, res, next) => {
    res.render("birthday_create.hbs");
});

router.post("/birthday/create", (req, res, next) => {
    res.redirect("/birthdays");
});

// UPDATE BIRTHDAY
router.get("/birthday/edit", (req, res, next) => {
    res.render("birthday_edit.hbs");
});

module.exports = router;