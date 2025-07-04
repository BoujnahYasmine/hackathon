const express = require("express");
const router = express.Router();
const multer = require("multer");
const Activity = require("../models/Activity");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage }); // <-- Moved here before routes

// DELETE /api/activities/:id
router.delete("/:id", async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: "Activity deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/activities/:id
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description, city, type } = req.body;
    let updateData = { title, description, city, type };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedActivity);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/activities
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    console.error("Failed to fetch activities", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/activities
router.post("/", upload.single("image"), async (req, res) => {
  const { title, description, city, type } = req.body;
  const image = req.file?.filename;

  if (!title || !description || !city || !type || !image) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newActivity = new Activity({
      title,
      description,
      city,
      type,
      image, // store filename only
    });

    await newActivity.save();
    res.status(201).json({ message: "Activity added successfully." });
  } catch (err) {
    console.error("Activity upload error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
