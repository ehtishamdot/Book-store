const mongoose = require("mongoose");
const Joi = require("joi");

const bookSchema = new mongoose.Schema({
  booktitle: {
    type: String,
    required: true,
    minlenth: 2,
    maxlength: 255,
    trim: true,
  },
  description: {
    type: String,
    minlenth: 5,
    maxlength: 1024,
    trim: true,
  },
  tags: {
    type: Array,
    minlength: 2,
    maxlength: 64,
  },
  author: {
    type: new mongoose.Schema({
      adminId: {type: mongoose.Types.ObjectId, required: true },
      authorName: {
        type: String,
        required: true,
        minlenth: 2,
        maxlength: 50,
        trim: true,
        default: "anonymous"
      },
      authorBio: {
        type: String,
        minlenth: 2,
        maxlength: 1024,
        trim: true,
      },
    })
  },
  onDownload: {
    type: Boolean,
    default: false,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  meta: {
    upVote: {
      type: Number,
      default: 0,
    },
    downVote: {
      type: Number,
      default: 0,
    },
  },
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reviews",
    },
  ],
  download: Number,
});

const bookModel = mongoose.model("Book", bookSchema);

const validateBook = (body) => {
  const schema = Joi.object({
    booktitle: Joi.string().min(2).max(255).required(),
    authorName : Joi.string().min(2).max(50).optional(),
    authorBio: Joi.string().min(5).max(1024).optional()
  });
  return schema.validate(body);
};

module.exports = { validateBook, bookModel };