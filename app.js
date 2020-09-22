const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const postRoute = require("./routes/posts");
const bodyParser = require("body-parser");
const cors = require('cors')

// Middleware
app.use(cors)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/posts", postRoute);

// connect to database
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("DATABASE connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000);
