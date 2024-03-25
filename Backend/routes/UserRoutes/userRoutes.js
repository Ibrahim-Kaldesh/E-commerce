import express from "express";
import {
  addBook,
  createUser,
  removeBook,
  showAllUsers,
  showAllBooksOfSingleUser,
} from "../../Controllers/UserControllers/userControllers.js";

const userRouter = express.Router();

userRouter.route("/").get(showAllUsers).post(createUser);

userRouter.get("/addBook/:userId/:bookId", addBook);
userRouter.delete("/removeBook/:userId/:bookId", removeBook);

userRouter.get("/showAllbooks/:userId", showAllBooksOfSingleUser);

export default userRouter;
