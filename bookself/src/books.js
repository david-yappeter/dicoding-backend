const { nanoid } = require('nanoid');

class BookService {
  constructor() {
    this._books = [];
  }

  addBook({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }) {
    const id = `book-${nanoid(16)}`;
    const currentTime = new Date().toISOString();

    const book = {
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
      insertedAt: currentTime,
      updatedAt: currentTime,
    };
    this._books.push(book);

    return book;
  }

  async getBooks() {
    return this._books.map((book) => book);
  }

  async getBookById(id) {
    return this._books.find((book) => book.id === id);
  }

  async editBookById(editBook) {
    const currentTime = new Date().toISOString();
    editBook['finished'] = editBook.pageCount === editBook.readPage;
    const bookIdx = this._books.findIndex((book) => book.id === editBook.id);
    if (bookIdx < 0) {
      return false;
    }

    const selectedBook = {
      ...this._books[bookIdx],
      ...editBook,
      updatedAt: currentTime,
    };

    this._books[bookIdx] = selectedBook;

    return true;
  }

  async deleteBookById(id) {
    const bookIdx = this._books.findIndex((book) => book.id === id);
    if (bookIdx < 0) {
      return false;
    }

    this._books.splice(bookIdx, 1);
    return true;
  }
}

module.exports = {
  BookService,
};
