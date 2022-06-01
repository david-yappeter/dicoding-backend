const { check, param, query, validationResult } = require('express-validator');
const books = require('./books');

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res
      .status(error.msg.errorCode)
      .json({ status: error.msg.status, message: error.msg.message });
  }
  return next();
};

const insertBookValidation = [
  check('name').notEmpty().withMessage({
    message: 'Gagal menambahkan buku. Mohon isi nama buku',
    errorCode: 400,
    status: 'fail',
  }),
  check('pageCount')
    .notEmpty()
    .withMessage({
      message: 'Gagal menambahkan buku. Mohon isi pageCount',
      errorCode: 400,
      status: 'fail',
    })
    .isNumeric()
    .withMessage({
      message: 'Gagal menambahkan buku. pageCount wajib berupa angka',
      errorCode: 400,
      status: 'fail',
    }),
  check('readPage')
    .notEmpty()
    .withMessage({
      message: 'Gagal menambahkan buku. Mohon isi readPage',
      errorCode: 400,
      status: 'fail',
    })
    .isNumeric()
    .withMessage({
      message: 'Gagal menambahkan buku. readPage wajib berupa angka',
      errorCode: 400,
      status: 'fail',
    })
    .custom((value, { req }) => {
      if (value > req.body.pageCount) {
        throw Object({
          message:
            'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
          errorCode: 400,
          status: 'fail',
        });
      }
      return true;
    }),
  // check('year')
  //   .notEmpty()
  //   .withMessage({
  //     message: 'Gagal menambahkan buku. Mohon isi year',
  //     errorCode: 400,
  //     status: 'fail',
  //   })
  //   .isNumeric({
  //     message: 'Gagal menambahkan buku. year wajib berupa angka',
  //     errorCode: 400,
  //     status: 'fail',
  //   }),
  // check('author').notEmpty().withMessage({
  //   message: 'Gagal menambahkan buku. Mohon isi author',
  //   errorCode: 400,
  //   status: 'fail',
  // }),
  // check('summary').notEmpty().withMessage({
  //   message: 'Gagal menambahkan buku. Mohon isi summary',
  //   errorCode: 400,
  //   status: 'fail',
  // }),
  // check('publisher').notEmpty().withMessage({
  //   message: 'Gagal menambahkan buku. Mohon isi publisher',
  //   errorCode: 400,
  //   status: 'fail',
  // }),
  // check('reading')
  //   .notEmpty()
  //   .withMessage({
  //     message: 'Gagal menambahkan buku. Mohon isi reading',
  //     errorCode: 400,
  //     status: 'fail',
  //   })
  //   .isBoolean()
  //   .withMessage({
  //     message: 'Gagal menambahkan buku. reading wajib berupa Boolean',
  //     errorCode: 400,
  //     status: 'fail',
  //   }),
];

const getBooksValidation = [
  query('name').if(query('name').exists()).notEmpty().withMessage({
    message: 'Gagal mengambil buku. name pencarian tidak boleh kosong',
    errorCode: 400,
    status: 'fail',
  }),
  query('reading')
    .if(query('reading').exists())
    .isNumeric()
    .withMessage({
      message: 'Gagal mengambil buku. reading wajib berupa angka 0 atau 1',
      errorCode: 400,
      status: 'fail',
    })
    .custom((value) => {
      value = parseInt(value);
      if (!(value === 0 || value === 1)) {
        throw Object({
          message: 'Gagal mengambil buku. reading wajib berupa angka 0 atau 1',
          errorCode: 400,
          status: 'fail',
        });
      }

      return true;
    }),
  query('finished')
    .if(query('finished').exists())
    .isNumeric()
    .withMessage({
      message: 'Gagal mengambil buku. finished wajib berupa angka 0 atau 1',
      errorCode: 400,
      status: 'fail',
    })
    .custom((value) => {
      value = parseInt(value);
      if (!(value === 0 || value === 1)) {
        throw Object({
          message: 'Gagal mengambil buku. finished wajib berupa angka 0 atau 1',
          errorCode: 400,
          status: 'fail',
        });
      }

      return true;
    }),
];

const updateBookValidation = [
  param('bookId').custom((value) => {
    if (!books.some((book) => book.id === value)) {
      throw Object({
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
        errorCode: 404,
        status: 'fail',
      });
    }
    return true;
  }),
  check('name').notEmpty().withMessage({
    message: 'Gagal memperbarui buku. Mohon isi nama buku',
    errorCode: 400,
    status: 'fail',
  }),
  check('pageCount')
    .notEmpty()
    .withMessage({
      message: 'Gagal memperbarui buku. Mohon isi pageCount',
      errorCode: 400,
      status: 'fail',
    })
    .isNumeric()
    .withMessage({
      message: 'Gagal memperbarui buku. pageCount wajib berupa angka',
      errorCode: 400,
      status: 'fail',
    }),
  check('readPage')
    .notEmpty()
    .withMessage({
      message: 'Gagal memperbarui buku. Mohon isi readPage',
      errorCode: 400,
      status: 'fail',
    })
    .isNumeric()
    .withMessage({
      message: 'Gagal memperbarui buku. readPage wajib berupa angka',
      errorCode: 400,
      status: 'fail',
    })
    .custom((value, { req }) => {
      if (value > req.body.pageCount) {
        throw Object({
          message:
            'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
          errorCode: 400,
          status: 'fail',
        });
      }
      return true;
    }),
];

const deleteBookValidation = [
  param('bookId').custom((value) => {
    if (!books.some((book) => book.id === value)) {
      throw Object({
        message: 'Buku gagal dihapus. Id tidak ditemukan',
        errorCode: 404,
        status: 'fail',
      });
    }
    return true;
  }),
];

module.exports = {
  errorHandler,
  insertBookValidation,
  getBooksValidation,
  updateBookValidation,
  deleteBookValidation,
};
