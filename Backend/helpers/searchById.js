export const finduserById = function (users, req) {
  return users.find((u) => u.id === +req.params.userId);
};

export const findBookById = function (books, req) {
  console.log(req.params.bookId)
  const b =  books.find((b) => b.id === +req.params.bookId);
  console.log(b)
  return  b
};
