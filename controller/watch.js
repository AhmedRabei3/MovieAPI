const { User } = require("../models/User");
const mongoose = require("mongoose");

/**-------------------------------------
 * @desc add movie to watch list
 * @method Post
 * @access Private
 * @route api/watch/addToWatchList
 *------------------------------------*/

exports.addToWatchList = async (req, res) => {
  const { movie, watched } = req.body;
  try {
    const user = await User.findById(req.userId);
    const index = user.watchList.findIndex((m) => m.movie == movie);
    index > -1
      ? (user.watchList[index].watched = watched)
      : user.watchList.push({ movie, watched });
    await user.save();
    return res.status(200).json(user.watchList);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

/**-------------------------------------
 * @desc delete movie from watch list
 * @method DELETE
 * @access Private
 * @route api/movie/delete
 *------------------------------------*/

exports.deleteFormWatchList = async (req, res) => {
  const { movie } = req.params;
  try {
    const user = await User.findById(req.userId);
    user.watchList = user.watchList.filter(m => m.movie != movie)
    await user.save();
    return res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

/**-------------------------------------
 * @desc Show watch list
 * @method GET
 * @access Private
 * @route api/watch/watchList
 *------------------------------------*/

exports.showWatchList = async (req, res) => {
  const user = await User.findById(req.userId)
    .select("-watchList._id")
    .populate("watchList.movie",['name','rate']);
  try {
    res.status(200).json(user.watchList);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
