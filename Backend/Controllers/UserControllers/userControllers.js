import {
  readFromJson,
  writeToJson,
} from "../../data/HandleR&W/readAndWrite.js";

const users = JSON.parse(readFromJson("./data/users.json"));

export const showAllUsers = function (req, res, next) {};
export const createUser = function (req, res, next) {};
export const removeUser = function (req, res, next) {};
export const showUserById = function (req, res, next) {};
