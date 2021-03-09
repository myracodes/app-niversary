const express = require('express');
const router = express.Router();
const GiftModel = require('../models/gifts')
const fileUploader = require('../config/cloudinary')



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
    res.render('partials/gifts_create.hbs')
})

//here, to post the informaton of the gift
router.post("/gifts/create", fileUploader.single("Picture"), (req, res, next)=>{
    console.log("-----JE RENTRE DANS LE CREATE --------");
    const newGift = { ...req.body };
    if (!req.file) newGift.Picture = undefined;
    else newGift.Picture = req.file.path;
    GiftModel.create(newGift)
    .then(()=>{
        console.log(req.body, "----- J AI BIEN CRÉE LE CADEAU-----");
        res.redirect('/gifts')
    })
    .catch((error)=>{
        console.log(error)
    })
})

//ROUTE TO UPDATE GIFT
//first, we get the form with the ID of the gift and its values
router.get("/gifts/update/:id",(req, res, next)=>{
    
    GiftModel.findById(req.params.id)
    .then((dbGifts)=>{
        res.render("partials/gifts_update", {dbGifts})
    })
    .catch((error)=>{
        console.log(error)
    })
})
//Now we'll post the information updated
router.post("/gifts/update/:id", fileUploader.single("Picture"), (req, res, next)=>{
    console.log("-------RENTRE DANS UPDATE---------");
    const giftToUpdate = {...req.body};
    if (req.file) giftToUpdate.Picture = req.file.path;
    GiftModel.findByIdAndUpdate(req.params.id, giftToUpdate)
    .then(()=>{
        res.redirect("/gifts");
    })
    .catch((error)=>{
        res.redirect("/gifts/update/:id", error);
    })
});

//ROUTE TO DELETE THE GIFT
router.post("/gifts/delete/:id", (req, res, next) => {
  GiftModel.findByIdAndDelete(req.params.id)
    .then(() => {
        console.log("-----JE DELETE BIEN-----");
      res.redirect("/gifts");
    })
    .catch((error) => {
        console.log("------JE RENTRE PAS DANS LE DELETE-----");
      console.log(error);
    });
});

// ROUTE TO SEE THE DETAILS OF A SPECIFIC GIFT
router.get('/gifts/details/:id', (req, res, next)=>{
    GiftModel.findById(req.params.id)
    .then((gift)=>{
        res.render("partials/gift_details.hbs", {gift})
    })
    .catch((error)=>{
        console.log(error)
    })
})

















module.exports = router;