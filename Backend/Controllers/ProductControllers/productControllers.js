import {
  readFromJson,
  writeToJson,
} from "../../data/HandleR&W/readAndWrite.js";

const products = JSON.parse(readFromJson("./data/products.json"));

export const showAllProducts = function (req, res, next) {};
export const createProduct = function (req, res, next) {};
export const removeProduct = function (req, res, next) {};
export const showProductById = function (req, res, next) {};
export const updateProductById = function (req, res, next) {};
