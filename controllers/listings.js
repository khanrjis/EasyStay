const Listing = require("../models/listings.js");
const Review = require("../models/review.js");
// INDEX
module.exports.index = async (req, res, next) => {
  try {
    const allListings = await Listing.find({});
    res.render("index", { allListings });
  } catch (err) {
    next(err);
  }
};
//new route
module.exports.renderNew = (req, res) => {
  res.render("new");
};
//show route
module.exports.showRoute = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("reviews").populate("owner");
    if (!listing) return res.redirect("/listings");
    res.render("show", { listing });
  } catch (err) {
    next(err);
  }
};
//create route
module.exports.createRoute =  async (req, res, next) => {
  try {
    const newListing = new Listing(req.body);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Listing created successfully!");
    res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
    next(err);
  } 
};


//edit route
module.exports.renderEdit = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.redirect("/listings");
    res.render("edit", { listing });
  } catch (err) {
    next(err);
  }
};

//update route
module.exports.updateRoute = async (req, res, next) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${updatedListing._id}`);
  } catch (err) {
    next(err);
  }
}

//delete route
module.exports.deleteRoute =  async (req, res, next) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};

//add reviews
module.exports.addReview = async (req, res, next) => {
  try{
     const listing = await Listing.findById(req.params.id);
    if (!listing) return res.redirect("/listings");
    const newReview = new Review(req.body.review);
    await newReview.save();
    listing.reviews.push(newReview);
    req.flash("success", "Review added successfully!");
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
  }
  catch (err) {
    console.log("Error adding review:", err.message);
    next(err);
  }
};

//delete review
module.exports.deleteReview = async (req, res, next) => {
  try {
    const { listingId, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(listingId, { $pull: { reviews: reviewId } });
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${listingId}`);
  } catch (err) {
    next(err);
  } 
};