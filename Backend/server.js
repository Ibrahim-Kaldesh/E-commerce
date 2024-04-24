import "./DB/connection.js";
import app from "./app.js";

app.listen(
  process.env.PORT,
  console.log(`App running on port ${process.env.PORT} ...`)
);
