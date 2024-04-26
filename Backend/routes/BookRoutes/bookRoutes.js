import express from "express";
import {
  createBook,
  showAllBooks,
  updateBookById,
  showBookById,
  deleteBook,
  showAllUsersOfSingleBook,
  showAllRatingsOfSingleBook,
} from "../../Controllers/BookControllers/bookControllers.js";

const bookRouter = express.Router();

bookRouter.route("/").get(showAllBooks).post(createBook);

bookRouter.get("/showAllbooks/:bookId", showAllUsersOfSingleBook);
bookRouter.get("/showAllRatings/:bookId", showAllRatingsOfSingleBook);

bookRouter
  .route("/:bookId")
  .patch(updateBookById)
  .delete(deleteBook)
  .get(showBookById);

export default bookRouter;
