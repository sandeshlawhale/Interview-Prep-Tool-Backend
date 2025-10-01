import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ["human", "ai"], required: true },
  content: { type: String, required: true },
});

const v2InterviewSessionSchema = new mongoose.Schema(
  {
    jobRole: { type: String, trim: true },
    domain: { type: String, trim: true },
    skills: {
      type: [String],
      trim: true,
    },

    chatHistory: [messageSchema],
    status: {
      type: String,
      enum: ["active", "submitting", "completed"],
      default: "active",
    },
    currentStep: { type: String, default: "questioning" },
    lastFeedback: String,
    overallFeedback: Object,
  },
  { timestamps: true }
);

// if (mongoose.models.v2InterviewSession) {
//   delete mongoose.models.v2InterviewSession;
// }

export const v2InterviewSession =
  mongoose.models.v2InterviewSession ||
  mongoose.model("v2InterviewSession", v2InterviewSessionSchema);
