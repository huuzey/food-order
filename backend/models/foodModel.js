const mongoose = require("mongoose");

const foodschema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number },
    photo: { type: Array },
    category: { type: String },
    desc: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("foods", foodschema);
