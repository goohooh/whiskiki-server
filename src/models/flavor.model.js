const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const flavorSchema = mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
flavorSchema.plugin(toJSON);

/**
 * @typedef Flavor
 */
const Flavor = mongoose.model('Flavor', flavorSchema);

module.exports = Flavor;
