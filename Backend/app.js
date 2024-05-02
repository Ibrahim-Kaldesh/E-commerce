import express from "express";
import userRouter from "./routes/UserRoutes/userRoutes.js";
import bookRouter from "./routes/BookRoutes/bookRoutes.js";
import ratingRouter from "./routes/RatingRoutes/ratingRoutes.js";
import AppError from "./util/appError.js";
import { globalErrorrHandling } from "./Controllers/errorControllers/errorContollers.js";

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/ratings", ratingRouter);

// For any (un) Hnadled route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 500));
});

// Global Error Handling response
app.use(globalErrorrHandling);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;
