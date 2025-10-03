import { InterviewService } from "../services/interviewService.js";

const interviewService = new InterviewService();

export const startInterview = async (req, res, next) => {
  try {
    const { jobRole, skills, domain } = req.body;

    if (!domain) {
      return res.status(400).json({
        success: false,
        message: "Domain is required for interviews",
      });
    }
    if (!jobRole) {
      return res.status(400).json({
        success: false,
        message: "JobRole is required for interviews",
      });
    }
    if (!skills || !skills.length) {
      return res.status(400).json({
        success: false,
        message: "At least one skill is required for interviews",
      });
    }

    const result = await interviewService.startInterview(
      jobRole,
      skills,
      domain
    );

    const introQuestion = await interviewService.getIntroQuestion(
      result?.sessionId
    );

    res.status(201).json({
      success: true,
      sessionId: result.sessionId,
      question: introQuestion,
    });
  } catch (error) {
    next(error);
  }
};

export const getNextQuestion = async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId;
    const result = await interviewService.getNextQuestion(sessionId);
    res.status(200).json({
      success: true,
      question: result,
    });
  } catch (error) {
    next(error);
  }
};

export const postAnswer = async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId;
    const { answer } = req.body;
    const result = await interviewService.postAnswer(sessionId, answer);
    res.json({
      success: true,
      feedback: result.feedback,
    });
  } catch (error) {
    next(error);
  }
};

export const submitInterview = async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId;
    const result = await interviewService.submitInterview(sessionId);
    res.status(200).json({
      success: true,
      overallFeedback: result.feedback,
      status: result.status,
    });
  } catch (error) {
    console.error("Error in submitInterview:", error.message);
    next(error);
  }
};

export const getInterviewStatus = async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId;
    const result = await interviewService.getInterviewStatus(sessionId);
    res.json({
      success: true,
      status: result,
    });
  } catch (error) {
    next(error);
  }
};
