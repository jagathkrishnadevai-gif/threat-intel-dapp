const express = require("express");
const crypto = require("crypto");
const Report = require("../models/Report");
const { encrypt } = require("../services/encryption");

const router = express.Router();

// Submit report
router.post("/", async (req, res) => {
  try {
    const { wallet, category, data } = req.body;

    if (!wallet || !category || !data) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Encrypt data
    const encrypted = encrypt(data);

    // Create hash
    const hash = crypto
      .createHash("sha256")
      .update(data + wallet)
      .digest("hex");

    const report = new Report({
      wallet,
      category,
      encryptedData: encrypted.data,
      iv: encrypted.iv,
      hash,
    });

    await report.save();

    res.json({
      message: "Report submitted",
      reportId: report._id,
      hash,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
