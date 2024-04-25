import express from "express";
import {
  addBook,
  createUser,
  removeBook,
  showAllUsers,
  showAllBooksOfSingleUser,
  showUserById,
  removeUser,
} from "../../Controllers/UserControllers/userControllers.js";
import {
  uploadPicture,
  resizeImage,
  updateUserPhoto,
} from "../../Controllers/UserControllers/userControllers.js";

const userRouter = express.Router();

userRouter.route("/").get(showAllUsers).post(createUser);
userRouter.route("/:userId").get(showUserById).delete(removeUser);

userRouter.get("/addBook/:userId/:bookId", addBook);
userRouter.delete("/removeBook/:userId/:bookId", removeBook);

userRouter.get("/showAllbooks/:userId", showAllBooksOfSingleUser);

userRouter.post(
  "/uploadprofilepicture",
  uploadPicture,
  resizeImage,
  updateUserPhoto
);

export default userRouter;
