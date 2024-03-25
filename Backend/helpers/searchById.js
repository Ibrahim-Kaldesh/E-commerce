export const finduserById = function (users, req) {
  return users.find((u) => u.id === +req.params.userId);
};

export const findBookById = function (books, req) {
  return books.find((b) => b.id === +req.params.bookId);
};
