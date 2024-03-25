import express from "express";
import {
  createProduct,
  showAllProducts,
} from "../../Controllers/BookControllers/bookControllers.js";

const productRouter = express.Router();

productRouter.route("/").get(showAllProducts).post(createProduct);

export default productRouter;
