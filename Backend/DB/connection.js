import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const DB = process.env.DB_HOST.replace("<password>", process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((x) => console.log("Connected to DB Successfully ✅"))
  .catch((e) => console.log(e));
