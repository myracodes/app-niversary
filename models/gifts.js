const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const giftSchema = new Schema({
  name: String,
  price: Number,
  Description: String,
  Picture: {
    type: String,
    default:
      "https://res.cloudinary.com/daax22fpi/image/upload/c_scale,w_360/v1615217327/App-niversary/cartoon-christmas-gift-box-element-png_224598_j4l8em.jpg",
  },
  purchaseLink: String, //ceci est un nice to have, pas obligatoire
  assignTo: [ //CECI A ETE RAJOUTE POUR VOIR SI ON PEUT ASSIGNER UN BIRTHDAY LORS DE LA CREATION DU GIFT
    {
      type: Schema.Types.ObjectId,
      ref: "birthdays",
    },
  ],
});


const GiftModel = mongoose.model("gifts", giftSchema);




module.exports = GiftModel;