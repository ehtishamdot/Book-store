const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
} = require("../controllers/books");

router.route("/").get(getAllBooks).post(createBook);
router.route("/:id").get(getSingleBook).patch(updateBook);

module.exports = router;
