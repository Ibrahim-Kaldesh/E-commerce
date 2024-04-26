import ratingModel from "../../DB/Models/ratingModel/ratingModel.js";
import AppError from "../../util/appError.js";
import { cathcAsync } from "../errorControllers/errorContollers.js";

export const createrating = cathcAsync(async function (req, res, next) {
  let rating;

  const checkRatingExists = await ratingModel.findOne({
    user: req.params.userId,
    book: req.params.bookId,
  });

  if (checkRatingExists) {
    rating = await ratingModel.findByIdAndUpdate(
      checkRatingExists._id,
      { rate: req.body.rate },
      { new: true, runValidators: true }
    );
  } else {
    req.body.user = req.params.userId;
    req.body.book = req.params.bookId;

    rating = await ratingModel.create(req.body);
  }

  res.status(201).json({
    message: "Rating created successfully",
    rating,
  });
});

export const removeRating = cathcAsync(async function (req, res, next) {
  const checkRatingExists = await ratingModel.findOne({
    user: req.params.userId,
    book: req.params.bookId,
  });

  if (checkRatingExists) {
    await ratingModel.findByIdAndDelete(checkRatingExists._id);
  } else {
    return next(new AppError("Rating doesn't exist !!", 404));
  }

  res.status(204).json({
    message: "Rating removed successfully",
    rating: null,
  });
});

export const showRatingById = cathcAsync(async function (req, res, next) {
  const rating = await ratingModel.findById(req.params.ratingId);

  if (!rating) return next(new AppError("Rating doesn't exist", 404));

  res.status(200).json({
    message: "Rating retrieved successfully",
    rating,
  });
});

export const showAllRatings = cathcAsync(async function (req, res, next) {
  const ratings = await ratingModel.find();

  res.status(200).json({
    results: await ratingModel.countDocuments(),
    message: "All ratings retrieved successfully",
    ratings,
  });
});
