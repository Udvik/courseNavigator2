// server/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },

  startedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],

  skillProficiency: {
    type: Map,
    of: {
      totalAttempted: { type: Number, default: 0 },
      totalCorrect: { type: Number, default: 0 },
    },
    default: {},
  }
});

export default mongoose.model("User", userSchema);
