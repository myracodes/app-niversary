const express = require('express');
const router = express.Router();
const GiftModel = require('../models/gifts')


//ROUTE TO DISPLAY THE LIST OF EXISTING GIFTS
router.get('/gifts', (req, res, next)=>{
    GiftModel.find()
    .then((dbGifts)=>{
        res.render('partials/gifts', {dbGifts})
    })
    .catch((error)=>{
        log(error)
    })
})


















module.exports = router;