// server/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import skillRoutes from "./routes/skills.js";
import courseRoutes from "./routes/courses.js";
import profileRoutes from "./routes/profile.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/skills", skillRoutes);

app.use("/api/courses", courseRoutes); 

app.use("/api/profile", profileRoutes);







mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
});

module.exports = app;
