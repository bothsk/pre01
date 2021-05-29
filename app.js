require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//////////Routes/////////
const indexRoute = require("./routes/indexRoute");
///////////////////////.
mongoose.connect(
  process.env.mongoURL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (err) return console.log(err);
    console.log("Connected to Database");
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoute);

app.use("", (req, res) => {
  res.status(404).send("404 URL not found");
});

app.listen(process.env.PORT, () =>
  console.log(`http://localhost:${process.env.PORT}`)
);
