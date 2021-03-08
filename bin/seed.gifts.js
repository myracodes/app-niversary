require("dotenv").config();
require("../config/mongodb");
const GiftModel = require('../models/gifts')

const someGifts = [
  {
    name: "Star Wars Jedi Fallen Order",
    price: 50.99,
    Description: "XBOX One game, for the whole family. The Jedi story",
    purchaseLink: "https://www.ea.com/fr-fr/games/starwars/jedi-fallen-order",
  },
  {
    name: "Guerre et Paix",
    price: 12.99,
    Description: "Tolstoi greatest novel",
    purchaseLink: "https://es.wikipedia.org/wiki/Guerra_y_paz",
  },
];

GiftModel.create(someGifts)
.then((gift)=>{
    console.log("NEW GIFTS CREATED!!! YEYYY", gift)
})
.catch((error)=>{
    console.log("NEW ERROR IN THE DATA BASE", error);
});