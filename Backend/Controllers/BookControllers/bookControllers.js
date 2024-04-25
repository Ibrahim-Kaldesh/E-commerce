import { readFromJson, writeToJson } from "../../helpers/readAndWrite.js";
import { findBookById } from "../../helpers/searchById.js";
import { cathcAsync } from "../errorControllers/errorContollers.js";
import AppError from "../../util/appError.js";
import bookModel from "../../DB/Models/bookModel/bookModel.js";

export const createBook = cathcAsync(async function (req, res, next) {
  if (!Object.entries(req.body).length)
    return next(new AppError("No Data", 400));

  // craete product and add it to products array
  const book = await bookModel.create(req.body);

  res.status(201).json({
    status: "Success !!",
    message: "Book created successfully",
  });
});

export const showAllBooks = cathcAsync(async (req, res, next) => {
  const books = await bookModel.find();

  return res.status(200).json({
    status: "Success !!",
    message: "All books retrieved successfully",
    data: books,
  });
});

export const deleteBook = cathcAsync(async function (req, res, next) {
  const bookToDelete = findBookById(books, req);

  if (!bookToDelete) return next(new AppError("Book not found !!", 404));

  const newBooks = books.filter((book) => {
    return book != bookToDelete;
  });

  await writeToJson("./data/books.json", newBooks);

  res.status(200).json({
    status: "Success !!",
    message: "Book deleted successfully",
  });
});

export const updateBookById = cathcAsync(async function (req, res, next) {
  if (!Object.entries(req.body).length)
    return next(new AppError("No Data", 400));

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
    return next(new AppError("Book not found !!", 404));
  }
  await writeToJson("./data/books.json", newBooks);

  res.status(201).json({
    status: "Success !!",
    message: "book updated successfully",
  });
});

export const showBookById = cathcAsync(function (req, res, next) {
  const bookToShow = findBookById(books, req);
  if (!bookToShow) return next(new AppError("Book not found !!", 404));

  res.status(200).json({
    status: "Success !!",
    data: bookToShow,
  });
});

export const showAllUsersOfSingleBook = cathcAsync(function (req, res, next) {
  const book = findBookById(books, req);
  if (!book) return next(new AppError("Book not found !!", 404));

  const bookId = +req.params.bookId;
  const allUsersOfBook = users.filter((user) => user.books.includes(bookId));

  res.status(200).json({
    status: "Success !!",
    message: "All users of the book retrieved successfully",
    data: allUsersOfBook,
  });
});
