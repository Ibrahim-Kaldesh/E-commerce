import express from "express";
import {
  createrating,
  removeRating,
  showAllRatings,
  showRatingById,
} from "../../Controllers/RatingControllers/ratingControllers.js";

const ratingRouter = express.Router();

ratingRouter.get("/", showAllRatings);

ratingRouter.post("/:userId/:bookId", createrating);

ratingRouter
  .route("/:userId/:bookId/:ratingId")
  .get(showRatingById)
  .delete(removeRating);

export default ratingRouter;
