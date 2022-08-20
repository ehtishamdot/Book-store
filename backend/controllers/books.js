const asyncWrapper = require("../middleware/async");
const auth = require("../middleware/auth");
const { bookModel, validateBook } = require("../models/Book");
const { StatusCodes } = require("http-status-codes");

const { Unauthorized } = require("../errors/index");

const getAllBooks = asyncWrapper(async (req, res, next) => {
  const books = await bookModel.find({});
  res.status(StatusCodes.ACCEPTED).json({ books });
});

const getSingleBook = asyncWrapper(async (req, res, next) => {
  const { id: bookId } = req.params;

  //asyncWrapper will check the error if book is not found
  const book = await bookModel.findOne({ _id: bookId });
  res.status(200).json({ book });
});

const createBook = asyncWrapper(async (req, res) => {
  const valid = validateBook(req.body);
  if (valid.error) return res.status(400).send(valid.error.details[0].message);

  const book = new bookModel(req.body);
  await book.save();
  res.send(book);
});

const updateBook = asyncWrapper(async (req, res) => {
  //asyncWrapper will check the error if book is not found
  const book = await bookModel.findById(req.params.id);

  if (book.author?.adminId != req.user._id)
    throw new Unauthorized("Access Denied");

  const updatedBook = await bookModel.findOneAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  await updatedBook.save();
  res.send(updatedBook);
});

const deleteBook = asyncWrapper(async (req, res) => {
  //asyncWrapper will check the error if book is not found
  const book = await bookModel.findById(req.params.id);

  if (book.author.adminId != req.user._id)
    throw new Unauthorized("Access Denied");

  await bookModel.findByIdAndDelete(req.params.id);
  res.send(book);
});

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
