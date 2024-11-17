import { celebrate, Joi, Segments } from "celebrate";

const emailValidation = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be of type string",
      "string.email": "Invalid email",
      "string.empty": "Email is a required field",
      "any.required": "Email is a required field",
    }),
  }),
});

const loginValidation = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be of type string",
      "string.email": "Invalid email",
      "string.empty": "Email is a required field",
      "any.required": "Email is a required field",
    }),
    password: Joi.string().min(6).max(32).required().messages({
      "string.base": "Password must be of type string",
      "string.min": "Password length must be from 6 to 32 characters",
      "string.max": "Password length must be from 6 to 32 characters",
      "string.empty": "Password is a required field",
      "any.required": "Password is a required field",
    }),
  }),
});

const passwordValidation = celebrate({
  [Segments.BODY]: Joi.object({
    oldPassword: Joi.string().min(6).max(32).required().messages({
      "string.base": "Password must be of type string",
      "string.min": "Password length must be from 6 to 32 characters",
      "string.max": "Password length must be from 6 to 32 characters",
      "string.empty": "Password is a required field",
      "any.required": "Password is a required field",
    }),
    newPassword: Joi.string().min(6).max(32).required().messages({
      "string.base": "Password must be of type string",
      "string.min": "Password length must be from 6 to 32 characters",
      "string.max": "Password length must be from 6 to 32 characters",
      "string.empty": "Password is a required field",
      "any.required": "Password is a required field",
    }),
  }),
});

export default { emailValidation, loginValidation, passwordValidation };
