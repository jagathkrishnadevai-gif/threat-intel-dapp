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

// Get global stats
router.get("/stats", async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();
    const uniqueWallets = await Report.distinct("wallet");

    // Mock tokens earned for now based on reports (e.g., 50 per report)
    const tokensEarned = totalReports * 50;

    res.json({
      threatsDetected: totalReports + 1200, // Mixing with fixed starting count for "scale"
      activeDefenders: uniqueWallets.length + 500,
      tokensEarned: tokensEarned.toLocaleString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get user-specific stats
router.get("/stats/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;
    const reportCount = await Report.countDocuments({ wallet: { $regex: new RegExp(wallet, "i") } });

    // Mock user stats
    res.json({
      reportsSubmitted: reportCount,
      reportsValidated: Math.floor(reportCount * 1.5), // Mock validation count
      reputationScore: 50 + (reportCount * 5) > 100 ? 99 : 50 + (reportCount * 5),
      memberSince: "Feb 2025"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
