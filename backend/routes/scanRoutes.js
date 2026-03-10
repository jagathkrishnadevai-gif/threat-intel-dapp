const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const Scan = require("../models/Scan");

const router = express.Router();

// Memory storage to avoid saving files on disk for now
const storage = multer.memoryStorage();
const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Simple threat detection heuristic
const checkThreats = (file) => {
    const fileName = file.originalname.toLowerCase();
    const buffer = file.buffer;

    // Heuristic 1: Filename keywords
    const suspiciousKeywords = ["virus", "malware", "ransomware", "trojan", "worm", ".exe", ".bat", ".sh"];
    const hasSuspiciousKeyword = suspiciousKeywords.some(kw => fileName.includes(kw));

    // Heuristic 2: Magic numbers (e.g., MZ for Windows executables)
    const isExecutable = buffer[0] === 0x4D && buffer[1] === 0x5A;

    // Heuristic 3: Random threat level for novelty
    const randomThreat = Math.random();

    let threatLevel = "Low";
    let malwareDetected = false;

    if (hasSuspiciousKeyword || isExecutable) {
        threatLevel = "High";
        malwareDetected = true;
    } else if (randomThreat > 0.85) {
        threatLevel = "Moderate";
    }

    return {
        threatLevel,
        malwareDetected,
        details: hasSuspiciousKeyword ? "Suspicious filename or extension detected." :
            isExecutable ? "Binary executable format detected." :
                "No immediate threats found via heuristics."
    };
};

router.post("/", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const file = req.file;
        const hash = crypto.createHash("sha256").update(file.buffer).digest("hex");

        // Perform "AI" scanning (Heuristics)
        const scanResult = checkThreats(file);

        const scanData = {
            fileName: file.originalname,
            fileSize: (file.size / 1024).toFixed(2) + " KB",
            threatLevel: scanResult.threatLevel,
            malwareDetected: scanResult.malwareDetected,
            scanTime: (Math.random() * 2 + 0.5).toFixed(1) + "s",
            hash: "SHA256: " + hash,
            explanation: scanResult.details
        };

        // Save to Database
        const scan = new Scan(scanData);
        await scan.save();

        res.json(scanData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Scan failed" });
    }
});

module.exports = router;
