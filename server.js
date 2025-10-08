import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import interviewRoutes from "./src/v1/routes/interviewRoutes.js";
import jobRoutes from "./src/v1/routes/jobRoutes.js";
import { errorHandler } from "./src/v1/middleware/errorHandler.js";
import { connectDB } from "./src/v1/config/database.js";

import v2InterviewRoutes from "./src/v2/routes/interviewRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

const allowedOrigins = [
  "https://interview-prep-tool-mu.vercel.app",
  "https://interview-prep-tool-obkvw1kyv-sandesh-lawhales-projects.vercel.app",
  "https://interview-prep-tool-v2.vercel.app",
  "https://interview-prep-tool-v2-git-main-sandesh-lawhales-projects.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());

app.use("/v2/api", v2InterviewRoutes);
app.use("/v2/api", jobRoutes);
app.use("/v2", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Interview API v2",
  });
});

app.use("/api", interviewRoutes);
app.use("/api", jobRoutes);
app.use("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Interview API",
  });
});

app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Interview API Server running on port ${PORT}`);
  });
}

export default app;
