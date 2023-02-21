const routes = (handler) => [
  {
    method: 'GET',
    path: '/books',
    handler: handler.getBooksHandler,
  },
  {
    method: 'POST',
    path: '/books',
    handler: handler.insertBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: handler.getBookHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: handler.updateBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: handler.deleteBookHandler,
  },
];

module.exports = routes;
