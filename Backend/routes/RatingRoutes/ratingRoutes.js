import express from "express";
import {
  createrating,
  removeRating,
  showAllRatings,
  showRatingById,
} from "../../Controllers/RatingControllers/ratingControllers.js";
import { userAuth } from "../../MiddleWare/Authentication/userAuthentication.js";
import { admiAuth } from "../../MiddleWare/Authentication/adminAuthentication.js";

const ratingRouter = express.Router();

ratingRouter.use(userAuth);

ratingRouter.post("/:bookId", createrating);

ratingRouter
  .route("/:bookId/:ratingId")
  .get(showRatingById)
  .delete(removeRating);

ratingRouter.use(admiAuth("admin"));
ratingRouter.get("/", showAllRatings);

export default ratingRouter;