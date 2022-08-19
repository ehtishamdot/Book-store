const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
} = require("../controllers/books");

router.route("/").get(getAllBooks);
router.post("/",auth,createBook);
router.route("/:id").get(getSingleBook);
router.patch('/:id',auth,updateBook);
router.delete('/:id',auth,deleteBook);
module.exports = router;