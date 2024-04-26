import express from "express";
import {
  addBook,
  createUser,
  removeBook,
  showAllUsers,
  showAllBooksOfSingleUser,
  showUserById,
  removeUser,
  showAllRatingsOfSingleUser,
  updateUserProfile,
} from "../../Controllers/UserControllers/userControllers.js";
import {
  uploadPicture,
  resizeImage,
  updateUserPhoto,
} from "../../Controllers/UserControllers/userControllers.js";

const userRouter = express.Router();

userRouter.route("/").get(showAllUsers).post(createUser);
userRouter
  .route("/:userId")
  .get(showUserById)
  .delete(removeUser)
  .patch(updateUserProfile);

userRouter.get("/addBook/:userId/:bookId", addBook);
userRouter.delete("/removeBook/:userId/:bookId", removeBook);

userRouter.get("/showAllbooks/:userId", showAllBooksOfSingleUser);
userRouter.get("/showAllRatings/:userId", showAllRatingsOfSingleUser);

userRouter.post(
  "/uploadprofilepicture",
  uploadPicture,
  resizeImage,
  updateUserPhoto
);

export default userRouter;
