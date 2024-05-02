import fs from "fs";

export const readFromJson = function (filePath) {
  const data = JSON.parse(fs.readFileSync(filePath));
  return data;
};

export const writeToJson = function (filePath, data) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) reject("error occurred when writing to file");
      else resolve("Successfull writing to File");
    });
  });
};
