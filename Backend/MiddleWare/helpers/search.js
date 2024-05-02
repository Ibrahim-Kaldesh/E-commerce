import { cathcAsync } from "../../Controllers/errorControllers/errorContollers.js";
import bookModel from "../../DB/Models/bookModel/bookModel.js";
import userModel from "../../DB/Models/userModel/userModel.js";

export const searchBook = cathcAsync(async function (req, res, next) {
  const search = req.query.search;

  const results = await bookModel.find({
    $or: [
      { title: { $regex: `${search}`, $options: "i" } },
      { author: { $regex: `${search}`, $options: "i" } },
    ],
  });

  req.search = search;
  req.results = results;

  next();
});

export const searchUser = cathcAsync(async function (req, res, next) {
  const search = req.query.search;

  const results = await userModel.find({
    $or: [{ userName: { $regex: `${search}`, $options: "i" } }],
  });

  req.search = search;
  req.results = results;

  next();
});