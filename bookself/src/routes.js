const {
  insertBookHandler,
  getBooksHandler,
  getBookHandler,
  updateBookHandler,
  deleteBookHandler,
} = require('./handler');
const {
  insertBookValidation,
  errorHandler,
  getBooksValidation,
  updateBookValidation,
  deleteBookValidation,
} = require('./validator');

module.exports = (app) => {
  app.get('/books', ...getBooksValidation, errorHandler, getBooksHandler);
  app.post('/books', ...insertBookValidation, errorHandler, insertBookHandler);
  app.get('/books/:bookId', getBookHandler);
  app.put(
    '/books/:bookId',
    ...updateBookValidation,
    errorHandler,
    updateBookHandler
  );
  app.delete(
    '/books/:bookId',
    ...deleteBookValidation,
    errorHandler,
    deleteBookHandler
  );
};
