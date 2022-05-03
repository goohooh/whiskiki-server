const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const whiskySchema = mongoose.Schema(
  {
    name_en: {
      type: String,
      required: true,
      trim: true,
    },
    name_ko: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      // required: true,
    },
    abv: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
whiskySchema.plugin(toJSON);
whiskySchema.plugin(paginate);

/**
 * @typedef User
 */
const Whisky = mongoose.model('Whisky', whiskySchema);

module.exports = Whisky;
