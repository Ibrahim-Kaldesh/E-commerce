import AppError from "../../util/appError.js";

export const admiAuth = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError(401, "unauthorized user !!"));
    next();
  };
};
