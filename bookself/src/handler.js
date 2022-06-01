const { nanoid } = require('nanoid');
const books = require('./books');

const insertBookHandler = (req, res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;
  const id = nanoid();
  const insertedAt = new Date().toISOString();

  books.push({
    id: id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished: pageCount === readPage,
    insertedAt: insertedAt,
    updatedAt: insertedAt,
  });

  return res.status(201).json({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
};

const getBooksHandler = (req, res) => {
  const { name, reading, finished } = req.query;
  let filteredBooks = [...books];

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter((book) => {
      return book.reading === (reading === '1');
    });
  }

  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter((book) => {
      return book.finished === (finished === '1');
    });
  }

  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) => {
      return book.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  return res.status(200).json({
    status: 'success',
    data: {
      books: filteredBooks.map((item) => ({
        id: item.id,
        name: item.name,
        publisher: item.publisher,
      })),
    },
  });
};

const getBookHandler = (req, res) => {
  const { bookId } = req.params;
  const book = books.find((book) => book.id === bookId);

  if (book === undefined) {
    return res.status(404).json({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
  }

  return res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
};

const updateBookHandler = (req, res) => {
  const { bookId } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;

  const book = books.find((book) => book.id === bookId);
  const index = books.findIndex((book) => book.id === bookId);

  books[index] = {
    id: bookId,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished: pageCount === readPage,
    insertedAt: book.insertedAt,
    updatedAt: new Date().toISOString(),
  };

  return res.status(200).json({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
};

const deleteBookHandler = (req, res) => {
  const { bookId } = req.params;
  books.splice(
    books.findIndex((book) => book.id === bookId),
    1
  );

  return res.status(200).json({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
};

module.exports = {
  insertBookHandler,
  getBooksHandler,
  getBookHandler,
  updateBookHandler,
  deleteBookHandler,
};
