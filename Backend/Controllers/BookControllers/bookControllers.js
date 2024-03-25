import { readFromJson, writeToJson } from "../../helpers/readAndWrite.js";

const products = readFromJson("./data/books.json");

export const showAllProducts = function (req, res, next) {
  try {
    res.status(200).json({
      status: "Success !!",
      message: "All products showed successfully",
      products,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail !!",
      message: e.message,
    });
  }
};
export const createProduct = function (req, res, next) {
  try {
    if (!req.body) throw new Error("No Data !!");

    // craete product and add it to products array
    const product = req.body;
    products.push(product);

    // update json file with new data
    writeToJson("./data/books.json", products);

    res.status(201).json({
      status: "Success !!",
      message: "Book created successfully",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail !!",
      message: e.message,
    });
  }
};

export const removeBook = function (req, res, next) {};
export const showBookById = function (req, res, next) {};
export const updateBookById = function (req, res, next) {};
