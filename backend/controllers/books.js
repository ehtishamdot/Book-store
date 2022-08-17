const asyncWrapper = require("../middleware/async");

const { bookModel, validateBook } = require("../models/Book");

const getAllBooks = asyncWrapper(async (req, res, next) => {
  const books = await bookModel.find({});
  res.status(200).json({ books });
});

const getSingleBook = asyncWrapper(async (req, res, next) => {
  const { id: bookId } = req.params;
  console.log(bookId);
  const book = await bookModel.findOne({ _id: bookId });

  if (!book) return res.status(404).json({ msg: "NOT FOUND ;-;" });

  res.status(200).json({ book });
});

const createBook = asyncWrapper(async (req, res) => {
  // const valid = validateBook(req.body);
  // if (valid.error) return res.status(400).send(valid.error.details[0].message);
  console.log(req.body);

  const book = await bookModel.create(req.body);
  res.status(200).json(req.body);
});

const updateBook = asyncWrapper(async (req, res) => {
  const book = await bookModel
    .findById(req.body._id)
    .select({ onDownload: 1, author: 1 });
  if (!book) return res.status(400).send("Book not found");

  console.log(book.onDownload, book.author);
  if (book.author.authorId != req.user._id)
    return res.status(401).send("Access Denied");

  book.onDownload = true;

  await book.save();
  res.send(book);
});

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
};
