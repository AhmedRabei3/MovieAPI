const mongoose = require("mongoose");
const Joi = require("joi");

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    watchList: [
      {
        movie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie",
        },
        watched: {
          type: Boolean,
          default: false,
        },
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", ModelSchema);

// validate register user
function validationRegUser(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().lowercase().trim().min(5).required().email(),
    password: Joi.string().trim().min(6).required(),
  });
  return schema.validate(obj);
}
// validate login user
function validationLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().lowercase().trim().min(5).required().email(),
    password: Joi.string().trim().min(6).required(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validationRegUser,
  validationLoginUser,
};
