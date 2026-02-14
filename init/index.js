const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");
const MONGO_URL =
  "mongodb+srv://mrrihan6789_db_user:EaseStay@cluster0.r4u6sud.mongodb.net/easestay";

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("DB Connected");
  } catch (error) {
    console.log("Database error:", error);
  }
};

const initDB = async () => {
  await Listing.deleteMany({});
  const updatedData = initData.data.map((item) => ({...item, owner: "698ce0690a873dede16b5c70"}));
  await Listing.insertMany(updatedData);  
  console.log("Data was initialized");
};

const start = async () => {
  await connectDb();
  await initDB();
  mongoose.connection.close(); // optional but clean
};

start();
