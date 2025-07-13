import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const isAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

router.post("/start/:courseId", isAuth, async (req, res) => {
  const user = await User.findById(req.user.userId);
  const courseId = req.params.courseId;

  if (!user.startedCourses.includes(courseId)) {
    user.startedCourses.push(courseId);
    await user.save();
  }

  res.json({ message: "Course marked as started!" });
});


router.post("/complete-course", isAuth, async (req, res) => {
  const { courseId, skillId } = req.body;
  const user = await User.findById(req.user.UserId);

  user.startedCourses = user.startedCourses.filter(
    (id) => id.toString() !== courseId
  );

  if (!user.completedCourses.includes(courseId)) {
    user.completedCourses.push(courseId);
  }

  if (!user.skillProficiency.has(skillId)) {
    user.skillProficiency.set(skillId, { totalAttempted: 0, totalCorrect: 0 });
  }

  await user.save();
  res.status(200).json({ message: "Course marked as completed" });
});

router.post("/submit-test", isAuth, async (req, res) => {
  const { skillId, attempted, correct } = req.body;
  const user = await User.findById(req.user.UserId);

  const existing = user.skillProficiency.get(skillId) || {
    totalAttempted: 0,
    totalCorrect: 0,
  };

  user.skillProficiency.set(skillId, {
    totalAttempted: existing.totalAttempted + attempted,
    totalCorrect: existing.totalCorrect + correct,
  });

  await user.save();
  res.status(200).json({ message: "Test result saved" });
});

// POST /api/profile/complete/:courseId
router.post("/complete/:courseId", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    const courseId = req.params.courseId;

    // Remove from startedCourses
    user.startedCourses = user.startedCourses.filter(
      (id) => id.toString() !== courseId
    );

    // Add to completedCourses (if not already there)
    if (!user.completedCourses.includes(courseId)) {
      user.completedCourses.push(courseId);
    }

    await user.save();
    res.json({ message: "Course marked as completed!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/me", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate("startedCourses") // ✅ must match schema name
      .populate("completedCourses");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
