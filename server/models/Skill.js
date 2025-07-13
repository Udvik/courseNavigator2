// server/models/Skill.js
import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

export default mongoose.model("Skill", skillSchema);
