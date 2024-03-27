import { readFromJson, writeToJson } from "../../helpers/readAndWrite.js";
import { findBookById } from "../../helpers/searchById.js";

const books = readFromJson("./data/books.json");
const users = readFromJson("./data/users.json");

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
export const showAllBooks = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: "Success !!",
      message: "All books retrieved successfully",
      data: books,
    });
  } catch (e) {
    return res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};
export const deleteBook = async function (req, res, next) {
  try {
    const bookToDelete = findBookById(books, req);
    console.log(bookToDelete);
    if (!bookToDelete) {
      return res.status(404).json({
        status: "fail",
        message: "book not found !!",
      });
    }
    const newBooks = books.filter((book) => {
      return book != bookToDelete;
    });
    console.log(newBooks);
    await writeToJson("./data/books.json", newBooks);
    res.status(200).json({
      status: "Success !!",
      message: "Book deleted successfully",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail !!",
      message: e.message,
    });
  }
};
export const updateBookById = async function (req, res, next) {
  try {
    if (!req.body) throw new Error("No Data!!");
    const bookToUpdate = findBookById(books, req);
    let flag = 0;
    let newBooks = books;
    const updatedBook = req.body;
    newBooks = newBooks.map((book) => {
      if (book == bookToUpdate) {
        flag = 1;
        return updatedBook;
      } else return book;
    });
    if (!flag) {
      return res.status(404).json({
        status: "fail",
        message: "book not found !!",
      });
    }
    await writeToJson("./data/books.json", newBooks);

    res.status(201).json({
      status: "Success !!",
      message: "book updated successfully",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail !@!",
      message: e.message,
    });
  }
};
export const showBookById = function (req, res, next) {
  try {
    const bookToShow = findBookById(books, req);
    if (!bookToShow) {
      return res.status(404).json({
        status: "fail",
        message: "book not found !!",
      });
    }

    res.status(200).json({
      status: "Success !!",
      data: bookToShow,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail !!",
      message: e.message,
    });
  }
};
export const showAllUsersOfSingleBook = function (req, res, next) {
  try {
    const book = findBookById(books, req);
    if (!book) {
      return res.status(400).json({
        status: "fail",
        message: "Book not found !!",
      });
    }
    const bookId = +req.params.bookId;
    const allUsersOfBook = users.filter((user) => user.books.includes(bookId));

    res.status(200).json({
      status: "Success !!",
      message: "All users of the book retrieved successfully",
      data: allUsersOfBook,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "e.message",
    });
  }
};
