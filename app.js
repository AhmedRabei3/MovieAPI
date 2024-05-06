var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const movieRouter = require("./routes/movie-routes");
const watchRouter = require("./routes/watch");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/auth", usersRouter);
app.use("/api/movie", movieRouter);
app.use("/api/watch", watchRouter);

mongoose.connect(process.env.DB_URL);

module.exports = app;
