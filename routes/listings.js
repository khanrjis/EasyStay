const express = require("express");
const router = express.Router();
const Listing = require("../models/listings");
const Review = require("../models/review");
const { isLoggedIn } = require("../middleware.js");
const controller = require("../controllers/listings.js");
// INDEX
router.get("/", (controller.index));
// NEW
router.get("/new", isLoggedIn, (controller.renderNew));

// SHOW
router.get("/:id",(controller.showRoute));

// CREATE
router.post("/",isLoggedIn,(controller.createRoute));

// EDIT
router.get("/:id/edit",isLoggedIn,(controller.renderEdit));

// UPDATE
router.put("/:id",isLoggedIn,(controller.updateRoute));

// DELETE
router.delete("/:id",isLoggedIn,(controller.deleteRoute));

//add reviews
router.post("/:id/reviews",isLoggedIn,controller.addReview);
//delete review
router.delete("/:listingId/reviews/:reviewId",isLoggedIn,controller.deleteReview);


module.exports = router;
