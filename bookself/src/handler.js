class BookHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.insertBookHandler = this.insertBookHandler.bind(this);
    this.getBooksHandler = this.getBooksHandler.bind(this);
    this.getBookHandler = this.getBookHandler.bind(this);
    this.updateBookHandler = this.updateBookHandler.bind(this);
    this.deleteBookHandler = this.deleteBookHandler.bind(this);
  }

  async insertBookHandler(request, h) {
    this._validator.validateInsertBookPayload(request.payload);

    const book = await this._service.addBook(request.payload);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: book.id,
      },
    });
    response.code(201);
    return response;
  }

  async getBooksHandler(request) {
    const { name, reading, finished } = request.query;

    const books = await this._service.getBooks();

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

    return {
      status: 'success',
      data: {
        books: filteredBooks.map((item) => ({
          id: item.id,
          name: item.name,
          publisher: item.publisher,
        })),
      },
    };
  }

  async getBookHandler(request, h) {
    const { bookId } = request.params;
    const book = await this._service.getBookById(bookId);

    if (book === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
      response.code(404);
      return response;
    }

    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  async updateBookHandler(request, h) {
    // Validator
    this._validator.validateUpdateBookPayload(request.payload);

    const { bookId } = request.params;
    const book = {
      id: bookId,
      ...request.payload,
    };
    const exist = await this._service.editBookById(book);

    if (!exist) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }

    return {
      status: 'success',
      message: 'Buku berhasil diperbarui',
      data: {
        book,
      },
    };
  }

  async deleteBookHandler(request, h) {
    const { bookId } = request.params;
    const exist = await this._service.deleteBookById(bookId);

    if (!exist) {
      const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }

    return {
      status: 'success',
      message: 'Buku berhasil dihapus',
    };
  }
}

module.exports = {
  BookHandler,
};
