import { readFromJson, writeToJson } from "../../helpers/readAndWrite.js";
import { findBookById, finduserById } from "../../helpers/searchById.js";
import AppError from "../../util/appError.js";
import { cathcAsync } from "../errorControllers/errorContollers.js";

const users = readFromJson("./data/users.json");
const books = readFromJson("./data/books.json");

export const createUser = cathcAsync(async (req, res, next) => {
  if (!Object.entries(req.body).length)
    return next(new AppError("No Data", 400));

  // craete product and add it to products array
  const user = req.body;
  users.push(user);

  // update json file with new data
  await writeToJson("./data/users.json", users);

  res.status(201).json({
    status: "Success !!",
    message: "user created successfully",
  });
});

export const showAllUsers = cathcAsync(async (req, res, next) => {
  res.status(200).json({
    status: "Success",
    message: "Users showed successfully",
    users,
  });
});

export const removeUser = cathcAsync(async (req, res, next) => {
  const userId = +req.params.userId;

  const idx = users.findIndex((u) => u.id === userId);
  users.splice(idx, 1);

  const newBooks = books.map((b) => {
    if (b.users.includes(userId)) {
      b.users = b.users.filter((id) => id !== userId);
    }
    return b;
  });

  // update json file with new data
  await writeToJson("./data/users.json", users);
  await writeToJson("./data/books.json", newBooks);

  res.status(203).json({
    status: "Success",
    message: "user deleted successfully",
  });
});

export const showUserById = cathcAsync(async (req, res, next) => {
  const user = finduserById(users, req);

  if (!user) return next(new AppError("user not found !!", 404));

  res.status(200).json({
    status: "Success",
    message: "User showed successfully",
    user,
  });
});

export const addBook = cathcAsync(async (req, res, next) => {
  const user = finduserById(users, req);
  if (!user) return next(new AppError("user not found !!", 404));

  const book = findBookById(books, req);
  if (!book) return next(new AppError("Book not found !!", 404));

  if (book.users.includes(user.id))
    return next(new AppError("Book already exists", 400));

  book.users.push(user.id);
  user.books.push(book.id);

  // update json file with new data
  await writeToJson("./data/users.json", users);
  await writeToJson("./data/books.json", books);

  res.status(200).json({
    status: "Success !!",
    message: "Book added to your books successfully",
  });
});

export const removeBook = cathcAsync(async (req, res, next) => {
  const user = finduserById(users, req);
  if (!user) return next(new AppError("user not found !!", 404));

  const book = findBookById(books, req);
  if (!book) return next(new AppError("Book not found !!", 404));

  if (!book.users.includes(user.id))
    return next(new AppError("Book doesn't exists !!", 400));

  book.users = book.users.filter((id) => id !== +req.params.userId);
  user.books = user.books.filter((id) => id !== +req.params.bookId);

  // update json file with new data
  await writeToJson("./data/users.json", users);
  await writeToJson("./data/books.json", books);

  res.status(200).json({
    status: "Success !!",
    message: "Book removed from your books successfully",
  });
});

export const showAllBooksOfSingleUser = cathcAsync(async (req, res, next) => {
  const user = finduserById(users, req);
  if (!user) return next(new AppError("user not found !!", 404));

  // return the books only included in the user books
  const userBooks = books.filter((book) => user.books.includes(book.id));

  return res.status(200).json({
    status: "Success !!",
    message: "Books of the user retrieved successfully",
    data: userBooks,
  });
});
