const express = require('express');
const router = express.Router();

router.get("/birthday/create", (req, res, next) => {
    res.render("birthday-create.hbs");
});

router.post("/birthday/create", (req, res, next) => {
    res.redirect("/birthdays");
});

module.exports = router;