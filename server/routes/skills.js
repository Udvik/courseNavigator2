// server/routes/skills.js
import express from "express";
import Skill from "../models/Skill.js";

const router = express.Router();

// GET all skills
router.get("/", async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});

// POST (admin only) - add a new skill
router.post("/", async (req, res) => {
  // Here you would typically check if the user is an admin
  const { name, description } = req.body;
  const newSkill = new Skill({ name, description });
  await newSkill.save();
  res.status(201).json({ message: "Skill added" });
});

export default router;
