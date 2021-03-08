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


//ROUTE TO CREATE A NEW GIFT
//here, to render the form

router.get('/gifts/create', (req, res, next)=>{
    res.render('partials/gifts-create.hbs')
})

//here, to post the informaton of the gift


















module.exports = router;