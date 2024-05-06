const mongoose = require("mongoose");
const Joi = require("joi");

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          comment: String,
          rate: Number,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

ModelSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

const Movie = mongoose.model("Movie", ModelSchema);

// validation
function validationMovie(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).required(),
    description: Joi.string().allow(" "),
    category: Joi.string().required(),
  });
  return schema.validate(obj);
}

module.exports = {
  Movie,
  validationMovie,
};
