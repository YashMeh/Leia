const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
  name: { type: String },
  ethernets: [{ ethernet: String, monitor: { type: Boolean, default: false } }],
  whole: { type: Boolean, default: false },
});

module.exports = mongoose.model("client", clientSchema);
