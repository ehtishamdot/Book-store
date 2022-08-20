const asyncWrapper = require("../middleware/async");

const reviewModel = require("../models/Review");
const { StatusCodes } = require("http-status-codes");

const getAllReviews = asyncWrapper(async (req, res, next) => {
  const reviews = await reviewModel.find({});
  res.status(StatusCodes.ACCEPTED).json({ reviews });
});

const createReview = asyncWrapper(async (req, res, next) => {
  const review = await reviewModel.create(req.body);
  res.status(StatusCodes.ACCEPTED).json({ review });
});

module.exports = {
  getAllReviews,
  createReview,
};
