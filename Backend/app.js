import express from "express";
import userRouter from "./routes/UserRoutes/userRoutes.js";
import productRouter from "./routes/ProductRoutes/productRoutes.js";

const app = express();

app.use(express.json());

app.use("api/v1/users", userRouter);
app.use("api/v1/products", productRouter);

export default app;
