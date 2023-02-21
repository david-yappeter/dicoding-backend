const Joi = require('joi');
const InvariantError = require('./exception/InvariantError');

const InsertBookPayloadSchema = (() => {
  return Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Gagal menambahkan buku. Mohon isi nama buku',
    }),
    readPage: Joi.number()
      .max(Joi.ref('pageCount'))
      .message(
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      ),
  }).unknown(true);
})();

const UpdateBookPayloadSchema = (() => {
  return Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Gagal memperbarui buku. Mohon isi nama buku',
    }),
    readPage: Joi.number()
      .max(Joi.ref('pageCount'))
      .message(
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      ),
  }).unknown(true);
})();

const BookValidator = {
  validateInsertBookPayload: (payload) => {
    const validationResult = InsertBookPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateUpdateBookPayload: (payload) => {
    const validationResult = UpdateBookPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = {
  BookValidator,
};
