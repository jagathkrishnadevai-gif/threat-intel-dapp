const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  wallet: String,
  category: {
    type: String,
    enum: ["Malware", "Phishing"],
    required: true,
  },
  encryptedData: String,
  iv: String,
  hash: String,
  status: {
    type: String,
    default: "pending",
  },
  votes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);
