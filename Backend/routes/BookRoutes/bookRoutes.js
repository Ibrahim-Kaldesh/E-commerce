import express from "express";
import {
  createBook,
  showAllBooks,
} from "../../Controllers/BookControllers/bookControllers.js";

const productRouter = express.Router();

productRouter.route("/").get(showAllBooks).post(createBook);

export default productRouter;
