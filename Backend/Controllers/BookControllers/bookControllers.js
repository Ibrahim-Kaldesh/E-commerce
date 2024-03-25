import { readFromJson, writeToJson } from "../../helpers/readAndWrite.js";

const books = readFromJson("./data/books.json");

export const createBook = function (req, res, next) {
  try {
    if (!req.body) throw new Error("No Data !!");

    // craete product and add it to products array
    const book = req.body;
    books.push(book);

    // update json file with new data
    writeToJson("./data/books.json", books);

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

export const showAllBooks = function (req, res, next) {};
export const deleteBook = function (req, res, next) {};
export const showBookById = function (req, res, next) {};
export const updateBookById = function (req, res, next) {};
export const showAllUsersOfSingleBook = function (req, res, next) {};

