const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "must provide review before proceed"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  book: {
    type: mongoose.Types.ObjectId,
    ref: "Book",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
