import { cathcAsync } from "../Controllers/errorControllers/errorContollers.js";

export const search = cathcAsync(async function (req, res, next) {
  const search = req.query.search;
  const resu
  req.search = search;
  next();
});
