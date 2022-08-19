const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlenth: 2,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlenth: 5,
    maxlength: 255,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    require: true,
    trim: true,
  },
  bio: {
    type: String,
    minlength: 2,
    maxlength: 1024,
    trim: true,
  },
});

adminSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this;
});

adminSchema.methods.genrateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

adminSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(this.password, userPassword);
};

const AdminModel = mongoose.model("Admin", adminSchema);

const validateAdmin = (body) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(body);
};

module.exports = { validateAdmin, AdminModel };
