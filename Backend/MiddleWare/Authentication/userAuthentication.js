import userModel from "../../DB/Models/userModel/userModel.js";
import { cathcAsync } from "../../Controllers/errorControllers/errorContollers.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import AppError from "../../util/appError.js";
import validator from "validator";

const createSendToken = async function (user, statusCode, res) {
  const token = jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: process.env.EXPIRED,
  });

  const tokens = user.tokens;
  tokens.push(token);

  await userModel.findByIdAndUpdate(
    user.id,
    { tokens },
    { new: true, runValidators: true }
  );

  // REMOVE PASSWORD FROM OUTPUT
  user.password = undefined;
  // REMOVE PASSWORD CONFIRM FROM OUTPUT
  user.passwordConfirm = undefined;
  // REMOVE Tokens FROM OUTPUT
  user.tokens = undefined;

  res.status(statusCode).json({
    apiStatus: "Success",
    message:
      statusCode === 201
        ? "user created successfully"
        : "Logged in successfully",
    data: user,
    token,
  });
};

export const signUp = cathcAsync(async function (req, res, next) {
    const user = await userModel.create(req.body);
    createSendToken(user, 201, res);
  });