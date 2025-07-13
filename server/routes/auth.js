// server/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
  res.json({ token, name: user.name, isAdmin: user.isAdmin });
});

export default router;
