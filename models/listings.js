const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    type: String,
    default: "https://a0.muscache.com/im/pictures/hosting/Hosting-1510134749909174781/original/a7488d1e-b396-4086-9fbc-074e61635aed.jpeg?im_w=960"
  },
  price: {
    type: Number,
    min: 0
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required:true
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  owner: {type: Schema.Types.ObjectId,
          ref: "User" }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

