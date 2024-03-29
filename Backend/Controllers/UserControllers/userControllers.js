import { readFromJson, writeToJson } from "../../helpers/readAndWrite.js";
import { findBookById, finduserById } from "../../helpers/searchById.js";

const users = readFromJson("./data/users.json");
const books = readFromJson("./data/books.json");

export const createUser = async (req, res, next) => {
  try {
    if (!req.body) throw new Error("No Data !!");

    // craete product and add it to products array
    const user = req.body;
    users.push(user);

    // update json file with new data
    await writeToJson("./data/users.json", users);

    res.status(201).json({
      status: "Success !!",
      message: "user created successfully",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail !!",
      message: e.message,
    });
  }
};

export const showAllUsers = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "Users showed successfully",
      users,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail!!",
      message: e.message,
    });
  }
};
export const removeUser = async (req, res, next) => {
  try {
    const userId = +req.params.userId;
 
    const idx = users.findIndex((u) => u.id === userId);
    users.splice(idx, 1);
 
    const newBooks = books.map((b) => {
      if (b.users.includes(userId)) {
        b.users = b.users.filter((id) => id !== userId);
      }
      return b;
    });
 
    // update json file with new data
    await writeToJson("./data/users.json", users);
    await writeToJson("./data/books.json", newBooks);
 
    res.status(203).json({
      status: "Success",
      message: "user deleted successfully",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail !!",
      message: e.message,
    });
  }
};
export const showUserById = async (req, res, next) => {
  try {
    const user = finduserById(users, req);
 
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found !!",
      });
    }
 
    res.status(200).json({
      status: "Success",
      message: "User showed successfully",
      user,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail!!",
      message: e.message,
    });
  }
};

export const addBook = async (req, res, next) => {
  try {
    const user = finduserById(users, req);
    if (!user)
      return res.status(404).json({
        status: "fail",
        message: "user not found !!",
      });

    const book = findBookById(books, req);
    if (!book)
      return res.status(404).json({
        status: "fail",
        message: "book not found !!",
      });

    if (book.users.includes(user.id))
      return res.status(400).json({
        status: "fail",
        message: "Book already exists",
      });

    book.users.push(user.id);
    user.books.push(book.id);

    // update json file with new data
    await writeToJson("./data/users.json", users);
    await writeToJson("./data/books.json", books);

    res.status(200).json({
      status: "Success !!",
      message: "Book added to your books successfully",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail !!",
      message: e.message,
    });
  }
};
export const removeBook = async (req, res, next) => {
  try {
    const user = finduserById(users, req);
    if (!user)
      return res.status(404).json({
        status: "fail",
        message: "user not found !!",
      });

    const book = findBookById(books, req);
    if (!book)
      return res.status(404).json({
        status: "fail",
        message: "book not found !!",
      });

    if (!book.users.includes(user.id))
      return res.status(400).json({
        status: "fail",
        message: "Book doesn't exists",
      });

    book.users = book.users.filter((id) => id !== +req.params.userId);
    user.books = user.books.filter((id) => id !== +req.params.bookId);

    // update json file with new data
    await writeToJson("./data/users.json", users);
    await writeToJson("./data/books.json", books);

    res.status(200).json({
      status: "Success !!",
      message: "Book removed from your books successfully",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail !!",
      message: e.message,
    });
  }
};
export const showAllBooksOfSingleUser = async (req, res, next) => {
  try {
    const user = finduserById(users, req);
    if (!user)
      return res.status(404).json({
        status: "fail",
        message: "user not found !!",
      });

    // return the books only included in the user books
    const userBooks = books.filter((book) => user.books.includes(book.id));

    return res.status(200).json({
      status: "Success !!",
      message: "Books of the user retrieved successfully",
      data: userBooks,
    });
  } catch (e) {
    return res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};
