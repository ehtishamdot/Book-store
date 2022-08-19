const express = require("express");
const router = express.Router();
const { validateAdmin, AdminModel } = require("../models/admin");

router.post("/", async (req, res) => {
  const valid = validateAdmin(req.body);
  if (valid.error) return res.status(400).send(valid.error.details[0].message);

  let user = new AdminModel(req.body);

  const token = user.genrateToken();

  await user.save();
  res.header("x-auth-token", token).send({ user });
});

module.exports = router;
