const express = require("express");
const app = express();
require("dotenv").config();
const books = require("./routes/Book");
const reviews = require("./routes/Review");
const connectDB = require("./db/connect");

app.use(express.json());

app.use("/api/v1/books", books);
app.use("/api/v1/reviews", reviews);

const port = process.env.PORT || 4000;

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
