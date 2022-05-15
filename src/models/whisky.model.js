const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const whiskySchema = mongoose.Schema(
  {
    enName: {
      type: String,
      trim: true,
    },
    koName: {
      type: String,
      // required: true,
      trim: true,
    },
    category: {
      type: String,
      // required: true,
    },
    country: {
      type: String,
      // required: true,
    },
    abv: {
      type: String,
      // required: true,
    },
    legacyId: {
      type: String,
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
