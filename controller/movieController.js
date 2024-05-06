const { Movie, validationMovie } = require("../models/Movie");

const asyncHandler = require("express-async-handler");

/**-------------------------------------
 * @desc add a new movie
 * @method POST
 * @access Private / admin
 * @route api/movie
 *------------------------------------*/
exports.create = asyncHandler(async (req, res) => {
  const { error } = validationMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { name, description, category } = req.body;
    let movie = await Movie.findOne({ name });
    if (movie) return res.status(400).send("This movie is already exist");
    movie = new Movie({ name, description, category });
    await movie.save();
    res.json({
      message: "success create",
      data: {
        name: movie.name,
        category: movie.category,
        description: movie.description,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Error ${error}` });
  }
});

/**-------------------------------------
 * @desc update movie info
 * @method PUT
 * @access Private / admin
 * @route api/movie/:id
 *------------------------------------*/

exports.update = async (req, res) => {
  const { error } = validationMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const movie = await Movie.findOne({ _id: req.params.id });
    if (!movie) return res.status(404).send("The movie not found!");
    await Movie.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
        },
      }
    );
    res.json({ message: "success update", movie });
  } catch (error) {
    res.status(500).json({ message: `Error ${error}` });
  }
};

/**-------------------------------------
 * @desc searching movie
 * @method GET
 * @access Public
 * @route api/movie/:id
 *------------------------------------*/

exports.find = async (req, res) => {
  const movies = await Movie.findById(req.params.id).select(["-reviews"]);
  if (!movies) return res.status(404).send("The movie was not found");
  res.json({ message: "success find", movies });
};

/**-------------------------------------
 * @desc Removing movie
 * @method DELETE
 * @access Private / admin
 * @route api/movie/:id
 *------------------------------------*/
exports.delete = async (req, res) => {
  try {
    const movie = await Movie.findOneAndDelete({ _id: req.params.id });
    if (!movie) return res.status(404).send("The movie not found!");
    res.json({ message: "success Delete" });
  } catch (error) {
    res.status(500).json({ message: `Error ${error}` });
  }
};

/**-------------------------------------
 * @desc mvie list
 * @method GET
 * @access Public
 * @route api/movie/all
 *------------------------------------*/

exports.list = async (req, res) => {
  const page = req.query?.page || 1;
  const limit = 2;
  const skip = (page - 1) * limit;
  const countMovies = await Movie.countDocuments();
  const movies = await Movie.find()
    .select("-reviews")
    .sort({ createdAt: -1 }) // sorting by  date in descending order
    .skip(skip)
    .limit(limit);
  res.json({
    message: "success list",
    totalPages: Math.ceil(countMovies / limit),
    currentPage: page,
    list: movies,
  });
};

/**-------------------------------------
 * @desc show review of movie
 * @method GET
 * @access Private
 * @route api/movie/:id/rev
 *------------------------------------*/
exports.reviews = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id)
    .select("-reviews._id")
    .populate("reviews.user", "name");
  console.log(movie);
  if (!movie) {
    return res.status(404).send("Movie not Found");
  }
  res.status(200).json({
    reviews: "success",
    data: movie.reviews,
  });
};

/**-------------------------------------
 * @desc add review to movie
 * @method Post
 * @access Private
 * @route api/movie/:id/rev
 *------------------------------------*/

exports.addReview = async (req, res) => {
  const { id } = req.params;
  const { comment, rate } = req.body;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).send("Movie not found or has been removed");
    }

    const isRated = movie.reviews.findIndex((i) => i.user == req.userId);
    if (isRated > -1) {
      return res.status(409).send(`User already rated this movie`);
    }
    const tRate = movie.reviews.reduce((sum, review) => sum + review.rate, 0);
    const finalRate = (tRate + rate) / (movie.reviews.length + 1);
    await Movie.updateOne(
      { _id: id },
      {
        $push: {
          reviews: { user: req.userId, comment, rate },
        },
        $set: { rate: finalRate },
      }
    );
    if (Number(rate) > 4) {
      res.status(201).json({ message: "thank you for grate rating" });
    } else if (rate >= 3) {
      res
        .status(201)
        .json({ message: `your review has been added successfully` });
    } else {
      res
        .status(201)
        .json({
          message: " Oh no we are so sorry about a bad experience you have",
        });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
