import express from "express";
import { admiAuth } from "../../MiddleWare/Authentication/adminAuthentication.js";
import {
  createBook,
  showAllBooks,
  updateBookById,
  showBookById,
  deleteBook,
  showAllUsersOfSingleBook,
  showAllRatingsOfSingleBook,
} from "../../Controllers/BookControllers/bookControllers.js";
import { userAuth } from "../../MiddleWare/Authentication/userAuthentication.js";
import { searchBook } from "../../MiddleWare/helpers/search.js";
import { searchBookRes } from "../../Controllers/UserControllers/userControllers.js";

const bookRouter = express.Router();

bookRouter.use(userAuth);

bookRouter.get("/showAllUsers/:bookId", showAllUsersOfSingleBook);
bookRouter.get("/showAllRatings/:bookId", showAllRatingsOfSingleBook);
bookRouter.get("/:bookId", showBookById);
bookRouter.route("/").get(showAllBooks).post(searchBook, searchBookRes);

bookRouter.use(admiAuth("admin"));
bookRouter.post("/", createBook);
bookRouter.route("/:bookId").patch(updateBookById).delete(deleteBook);

export default bookRouter;