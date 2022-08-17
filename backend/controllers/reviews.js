const asyncWrapper = require("../middleware/async");

const reviewModel = require("../models/Review");

const getAllReviews = asyncWrapper(async (req, res, next) => {
  const reviews = await reviewModel.find({});
  res.status(200).json({ reviews });
});

const createReview = asyncWrapper(async (req, res, next) => {
  const review = await reviewModel.create(req.body);
  res.status(200).json({ review });
});

module.exports = {
  getAllReviews,
  createReview,
};
