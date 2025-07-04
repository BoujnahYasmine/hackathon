const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true }, // file path
});

module.exports = mongoose.model("Activity", activitySchema);
