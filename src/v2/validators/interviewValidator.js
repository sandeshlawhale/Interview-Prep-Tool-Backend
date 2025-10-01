import Joi from "joi";

export const startInterviewSchema = Joi.object({
  skills: Joi.array().items(Joi.string()).min(3).max(5).required(),
  domain: Joi.string().required(),
  jobRole: Joi.string().required(),
});

export const postAnswerSchema = Joi.object({
  answer: Joi.string().min(140).max(1500).required(),
});

export const sessionIdParamSchema = Joi.object({
  sessionId: Joi.string().length(24).hex().required(),
});
