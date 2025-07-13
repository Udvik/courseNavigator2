import express from "express";
import Course from "../models/Course.js"; 

const router = express.Router();

// POST route
router.post("/", async (req, res) => {
  const {
    skillId,
    name,
    category,
    price,
    rating,
    language,
    certification,
    duration,
    link,
  } = req.body;

  const newCourse = new Course({
    skillId,
    name,
    category,
    price,
    rating,
    language,
    certification,
    duration,
    link,
  });

  await newCourse.save();
  res.status(201).json({ message: "Course added" });
});

// GET courses by skillId
router.get("/:skillId", async (req, res) => {
  try {
    const courses = await Course.find({ skillId: req.params.skillId });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});


export default router;
