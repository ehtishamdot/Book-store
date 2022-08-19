const asyncWrapper = require("../middleware/async");
const auth = require('../middleware/auth');
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
  console.log(req.user);
    const valid = validateBook(req.body);
    if(valid.error) return res.status(400).send(valid.error.details[0].message);
    const book = new bookModel({
        booktitle: req.body.booktitle,
        description: req.body.description,
        tags: req.body.tags,
        author: {
            adminId: req.user,
            username: req.body.username,
            bio: req.body.bio
        }
    })
    await book.save()
    res.send(book);
});

const updateBook = asyncWrapper(async (req, res) => {
  const book = await bookModel
    .findById(req.params.id);
  if (!book) return res.status(400).send("Book not found");

  if (book.author.adminId != req.user._id)
    return res.status(401).send("Access Denied");

  book.onDownload = true;

  await book.save();
  res.send(book);
});

const deleteBook = asyncWrapper(async (req,res) => {
  const book =  await bookModel.findById(req.params.id);
  if (!book) return res.status(400).send("Book not found");

  if (book.author.adminId != req.user._id)
    return res.status(401).send("Access Denied");
   
  await bookModel.findByIdAndDelete(req.params.id);
  res.send(book);
})

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
};