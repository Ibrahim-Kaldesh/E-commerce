import { writeToJson } from "../../helpers/readAndWrite.js";
import { finduserById } from "../../helpers/searchById.js";
import AppError from "../../util/appError.js";
import { cathcAsync } from "../errorControllers/errorContollers.js";
import userModel from "../../DB/Models/userModel/userModel.js";
import multer from "multer";
import sharp from "sharp";
import bookModel from "../../DB/Models/bookModel/bookModel.js";

export const createUser = cathcAsync(async (req, res, next) => {
  if (!Object.entries(req.body).length)
    return next(new AppError("No Data", 400));

  // craete product and add it to products array
  const user = await userModel.create(req.body);

  res.status(201).json({
    status: "Success !!",
    message: "user created successfully",
  });
});

export const showAllUsers = cathcAsync(async (req, res, next) => {
  const users = await userModel.find();

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

export const updateUserProfile = cathcAsync(async function (req, res, next) {
  user = await userModel.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "Success !!",
    message: "User updated successfully",
    user,
  });
});

export const showUserById = cathcAsync(async (req, res, next) => {
  const user = await userModel.findById(req.params.userId);

  if (!user) return next(new AppError("user not found !!", 404));

  res.status(200).json({
    status: "Success",
    message: "User showed successfully",
    user,
  });
});

export const addBook = cathcAsync(async (req, res, next) => {
  const book = await bookModel.findById(req.params.bookId);
  if (!book) return next(new AppError("Book not found !!", 404));

  if (book.users.includes(req.user._id))
    return next(new AppError("Book already exists", 400));

  book.users.push(req.user._id);
  req.user.books.push(book._id);

  await book.save({ validateBeforeSave: false });
  await req.user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "Success !!",
    message: "Book added to your books successfully",
  });
});

export const removeBook = cathcAsync(async (req, res, next) => {
  const book = await bookModel.findById(req.params.bookId);
  if (!book) return next(new AppError("Book not found !!", 404));

  if (!book.users.includes(req.user._id))
    return next(new AppError("Book doesn't exists !!", 400));

  book.users = book.users.filter((id) => {
    return String(id) !== String(req.user._id);
  });
  req.user.books = req.user.books.filter((id) => id != req.params.bookId);

  await book.save({ validateBeforeSave: false });
  await req.user.save({ validateBeforeSave: false });

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

export const showAllRatingsOfSingleUser = cathcAsync(async (req, res, next) => {
  const user = await userModel.findById(req.params.userId).populate("ratings");

  if (!user) return next(new AppError("user not found !!", 404));

  res.status(200).json({
    status: "Success",
    message: "User showed successfully",
    user,
  });
});

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else
    cb(
      new AppError("Invlaid file format!!, please upload a photo", 400),
      false
    );
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadPicture = upload.single("photo");

export const resizeImage = cathcAsync(async function (req, res, next) {
  req.filename = user-${req.body.userId}-${Date.now()}.jpeg;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(./public/images/${req.filename});

  next();
});

// Controllers for any user
export const updateUserPhoto = cathcAsync(async function (req, res, next) {
  let user = await userModel.findById(req.body.userId);
  if (!user) return next(new AppError("User not found !!", 404));

  user = await userModel.findByIdAndUpdate(
    req.body.userId,
    { profilePhoto: req.filename },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    user,
    status: "success",
    message: "Photo uploaded successfully.",
  });
});