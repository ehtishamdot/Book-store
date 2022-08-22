const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
require("./startup/routes")(app);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running at port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
