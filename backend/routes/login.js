const express = require("express");
const route = express.Router();
const { AdminModel } = require("../models/admin");
const Joi = require("joi");

route.post("/", async (req, res) => {
  const valid = loginValidator(req.body);
  if (valid.error) return res.status(400).send(valid.error.details[0].message);

  const admin = await AdminModel.findOne({ email: req.body.email });
  if (!admin) return res.status(400).send("Invalid Email or Password");

  const validPassword = admin.comparePassword(req.body.password);

  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  const token = admin.genrateToken();

  res.header("x-auth-token", token).send({ status: true, token });
});

const loginValidator = (body) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(body);
};
module.exports = route;
