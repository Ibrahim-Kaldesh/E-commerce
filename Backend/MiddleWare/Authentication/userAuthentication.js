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

export const signIn = cathcAsync(async function (req, res, next) {
    const { userNameOrEmail, password } = req.body;
  
    // 1) check if email and password exists
    if (!userNameOrEmail || !password)
      return next(new AppError("Missing userName or Email or password", 400));
  
    // 2) Find the user with that email or userName
    let query;
    if (validator.isEmail(userNameOrEmail))
      query = userModel.findOne({ email: userNameOrEmail });
    else query = userModel.findOne({ userName: userNameOrEmail });
    const user = await query.select("+password +tokens");
  
    if (!user) return next(new AppError("User not found", 401));
  
    // 3) check if password mathches with the password stored in DB
    if (!(await user.correctPassword(password, user.password)))
      return next(new AppError("Incorrect Password", 401));
  
    // 4) Generate token
    createSendToken(user, 200, res);
  });
