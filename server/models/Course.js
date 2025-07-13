import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "YouTube",
      "Coursera",
      "GeeksforGeeks",
      "NPTEL",
      "Infosys Springboard",
      "W3Schools",
    ],
    required: true,
  },
  price: {
    type: String,
    default: "Free",
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  language: {
    type: String,
  },
  certification: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Course", courseSchema);
