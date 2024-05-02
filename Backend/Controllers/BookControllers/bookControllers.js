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
  const book = await bookModel.findById(req.params.bookId);
  if (book) {
    await bookModel.findByIdAndDelete(req.params.bookId);
  } else {
    return next(new AppError("Book doesn't exist !!", 404));
  }
  res.status(200).json({
    status: "Success !!",
    message: "Book deleted successfully",
  });
});

export const updateBookById = cathcAsync(async function (req, res, next) {
  if (!Object.entries(req.body).length)
    return next(new AppError("No Data", 400));
  const newBook = await bookModel.findByIdAndUpdate(
    req.params.bookId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "Success !!",
    message: "book updated successfully",
    newBook,
  });
});

export const showBookById = cathcAsync(async function (req, res, next) {
  const bookToShow = await bookModel.findById(req.params.bookId);

  if (!bookToShow) return next(new AppError("Book not found !!", 404));

  res.status(200).json({
    status: "Success !!",
    data: bookToShow,
  });
});

export const showAllUsersOfSingleBook = cathcAsync(async function (
  req,
  res,
  next
) {
  const bookId = req.params.bookId;
  const book = await bookModel.findById(bookId);
  if (!book) return next(new AppError("Book not found !!", 404));

  // Populate the 'users' field to get the associated users
  await book.populate("users").execPopulate();

  res.status(200).json({
    status: "Success !!",
    message: "All users of the book retrieved successfully",
    data: book.users,
  });
});

export const showAllRatingsOfSingleBook = cathcAsync(async function (
  req,
  res,
  next
) {
  const bookToShow = await bookModel
    .findById(req.params.bookId)
    .populate("ratings");
  if (!bookToShow) return next(new AppError("Book not found !!", 404));

  res.status(200).json({
    status: "Success !!",
    data: bookToShow,
  });
});